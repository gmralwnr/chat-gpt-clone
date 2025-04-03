import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
    name?: string;
    content?: string;
    role: string;
}


export function Message(
    { name = "User", content = "", role, }: Props
    //props: test2
) {
    const isAssistant = role === "assistant"; //role 작성자 = > assistant chat gpt
    const avatarName = isAssistant ? "Chat GPT" : name;
    return <div className="flex items-start gap-2 mb-5">

        {/* 아바타 */}
        <Avatar>  {/* 어시스턴드 일경우에만 사진 노출 assistant */}
            <AvatarImage src={isAssistant
                ? "/logo4.png" : ""
            } alt="avatar" />
            <AvatarFallback> {avatarName ? avatarName[0] : ""}</AvatarFallback>
        </Avatar>

        {/* 이름 + 내용 */}
        <div className="mt-2">
            <h2 className="font-bold">{avatarName}</h2>
            <div className="mt-2 whitespace-break-spaces">{content}</div>
        </div>
    </div>
}