import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import { Logo } from "./Logo";
import { MessageSquare, Plus } from "lucide-react"
import { SideBarItem } from "./SideBarItem";
import { LogoutButton } from "./LogoutButton";
import { getConversationsByUser } from "@/data/user";

const NEW_SIDEBAR_ITEM = {
    id: "new",
    label: "새로운 대화",
    icon: <Plus />,
    href: BASE_URL
}



export async function SideBar() {

    const conversations = await getConversationsByUser(); //url 정보가 없기 때문에
    const formattedItems = [
        NEW_SIDEBAR_ITEM,
        ...conversations.map((conversations) => ({
            id: conversations.id,
            href: `${CHAT_ROUTES.CONVERSATIONS}/${conversations.id}`,
            icon: <MessageSquare />,
            label: conversations.name || "",
        }))
    ]
    return <nav className="h-full p-3 bg-black flex flex-col text-white">
        {/* 로고 영역 +메뉴 아이템 */}
        <div className="flex-1 overflow-y-auto">
            <Logo></Logo>
            <div className="flex flex-col gap-2 mt-10">
                {formattedItems.map((item) => (
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