'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSheetStore } from "@/store/sheet";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

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

    const handleMenu = () => {
        setIsMenuOpen((prev) => !prev);
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
            {icon} < div className="w-[180px] truncate" > {label}</div >
        </div >
        {/* 드롭다운 메뉴 영역  첫번째 새로운 대화일 땐 미노출 */}
        {
            id !== 'new' && (
                <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    {/*radix 자체 기본 DOM 엘리먼트를 쓰지 않고  요소를 복제 radix가 필요한 기능을 추가 해 주기 때문*/}
                    <DropdownMenuTrigger asChild>
                        <div onClick={handleMenu}>
                            <Ellipsis className={cn("group-hover:block text-gray-400 hover:text-white", isMenuOpen ? "block text-white" : "md:hidden text-gray-400")} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="gap-2"><Pencil size={18} />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Trash size={18} />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            )
        }
    </Link >
}