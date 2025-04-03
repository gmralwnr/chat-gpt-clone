'use client';
import { deleteConversation, updateConversation } from "@/actions/conversation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/store/modal";
import { useSheetStore } from "@/store/sheet";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChangeEvent, ReactNode, useEffect, useRef, useState, MouseEvent } from "react";
import toast from "react-hot-toast";
import { ModalFooter } from "../modal/ModalFooter";
import { BASE_URL } from "@/constants/routes";

type Props = {
    item: {
        id: string;
        href: string;
        icon: ReactNode;
        label: string;
    };
};

export function SideBarItem({ item }: Props) {
    const { id, href, icon, label } = item;
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const setOpen = useSheetStore((state) => state.setOpen);
    //수정인지 아닌지 확인하는 mode
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(item.label);
    // const { openModal, closeModal } = useModalStore((state) => ({
    //     openModal: state.openModal,
    //     closeModal: state.closeModal,
    // }));

    //modal 띄우기 
    const openModal = useModalStore((state) => state.openModal)
    const closeModal = useModalStore((state) => state.closeModal)
    //현재 페이지에서 삭제 했을 경우  BAS_URL 이동
    const params = useParams<{ conversationId: string }>();
    const router = useRouter();

    //edit 수정할 때 포커스 맞추기
    const inputRef = useRef<HTMLInputElement>(null);

    // 모드가 수정 될 시 포커스 맞추기 
    useEffect(() => {
        if (isEditMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditMode])

    //실시간 value 값 변환 
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleMenu = () => {
        setIsMenuOpen((prev) => !prev); //prev는 이전 상태 값을 의미함 !prev를 사용하여 현재 상태의 반대값(true → false, false → true)으로 변경

    }

    // conversation => title 수정 호출 
    const handleBlur = async () => {
        setIsEditMode(false)
        //value  와 label(기존 label 값) 같지 않을 때만 작동 
        if (value != label) {
            try {
                await updateConversation(id, value);
            } catch (error) {
                console.error(error);
                toast.error("이름 수정 실패하였습니다")
            }

        }
    }
    // 클릭시 input 창 변환 
    const clickEdit = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault(); //변경 되지 않도록 
        setIsEditMode(true);
        setIsMenuOpen(false);
    }

    //input 창에서 enter 후 저장
    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            await handleBlur();
        }
    }

    const handleDelete = async () => {
        try {
            //삭제
            await deleteConversation(id);
            toast.success("삭제했습니다");

            if (params.conversationId === id) {
                router.push(BASE_URL);
            }
            closeModal();
        } catch (error) {
            console.error(error);
            toast.error("삭제에 실패했습니다")
        }
    };


    //삭제 이벤트
    const clickDelete = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log(openModal)
        //모달 로직
        openModal({
            title: "정말 삭제하시겠습니까?",
            description: "삭제 후 데이터는 복구가 어렵습니다",
            footer: <ModalFooter onCancel={closeModal} onConfirm={handleDelete} />
        });
    }
    return <Link
        scroll={false}
        href={href}
        className={cn(
            "flex items-center justify-between text-sm p-3 group hover:text-white hover:bg-white/10 rounded-lg",
            isMenuOpen || pathname === href
                ? "text-white bg-white/10"
                : "text-zinc-400")}
        onClick={() => setOpen(false)}>

        {/* label 영역 */}
        < div className="flex items-center gap-2" >
            {icon} {isEditMode ?
                <input value={value}
                    onChange={handleChange}
                    onClick={(event) => event.preventDefault()}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    className="bg-transparent border border-zinc-400 rounded-lg px-2 py-1" /> : < div className="w-[180px] truncate" > {label}</div >}
        </div >
        {/* 드롭다운 메뉴 영역  첫번째 새로운 대화일 땐 미노출 */}
        {
            id !== 'new' && (
                <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    {/*radix 자체 기본 DOM 엘리먼트를 쓰지 않고  요소를 복제 radix가 필요한 기능을 추가 해 주기 때문*/}
                    <DropdownMenuTrigger asChild>
                        {/* 메뉴 드롭바 */}
                        <div onClick={handleMenu}>
                            <Ellipsis className={cn("group-hover:block text-gray-400 hover:text-white", isMenuOpen ? "block text-white" : "md:hidden text-gray-400")} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="gap-2" onClick={clickEdit}><Pencil size={18} />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={clickDelete}><Trash size={18} />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            )
        }
    </Link >
}