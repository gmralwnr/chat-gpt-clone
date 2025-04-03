import { Chat } from "@/components/chat/Chat";
import { getMessagesByConversation } from "@/data/conversation";
//데이터를 가져와서 useChat 셋팅을 해주는 로직 추가

//대화 페이지 params
type Props = {
    params: Promise<{
        conversationId: string;
    }>
}



// Next.js 14 이상에서는 서버 컴포넌트에서 params를 비동기적으로 다루는 방식이 변경되었습니다.
//params 객체를 바로 구조 분해 할당하면 비동기 로직을 처리하지 못해서 에러가 발생합니다.
//params.conversationId가 동기적으로 처리되기 전에 사용되었기 때문입니다.
// {
//     params: { conversationId },
// }: Props) {
//     const messages = await getMessagesByConversation(conversationId)
export default async function ConversationPage({ params }: Props) {
    const { conversationId } = await params;
    const messages = await getMessagesByConversation(conversationId)

    // 사이드 바 페이지 이동
    return <Chat initialMessages={messages} />
}