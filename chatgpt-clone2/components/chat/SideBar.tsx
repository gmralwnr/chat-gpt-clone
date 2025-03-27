import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import { Logo } from "./Logo";
import { MessageSquare, Plus } from "lucide-react"
import { SideBarItem } from "./SideBarItem";
import { LogoutButton } from "./LogoutButton";

const DUMY_ITEMS = [
    {
        id: "new",
        label: "새로운 대화",
        icon: <Plus />,
        href: BASE_URL
    },
    {
        id: "1",
        label: "새로운 긴 대화 예시입니다. 새로운 건 대화 예시입니다다",
        icon: <MessageSquare />,
        href: `${CHAT_ROUTES.COWVERSATIONS}/1`
    },
    {
        id: "2",
        label: "일반 대화 예시입니다",
        icon: <MessageSquare />,
        href: `${CHAT_ROUTES.COWVERSATIONS}/2`
    },
]

export function SideBar() {
    return <nav className="h-full p-3 bg-black flex flex-col text-white">
        {/* 로고 영역 +메뉴 아이템 */}
        <div className="flex-1 overflow-y-auto">
            <Logo></Logo>
            <div className="flex flex-col gap-2 mt-10">
                {DUMY_ITEMS.map((item) => (
                    <SideBarItem key={item.id} item={item} />
                ))}
            </div>
        </div>
        {/* 로그아웃 버튼 영역 */}
        <div className="flex justify-center">
            <LogoutButton />
        </div>
    </nav>
}