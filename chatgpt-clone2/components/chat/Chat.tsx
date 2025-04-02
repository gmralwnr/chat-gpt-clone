'use client'
import { useEffect, useRef, useState } from "react";
import { useChat, Message as TMessage } from "ai/react";
import { AutoResizingTextarea } from "./AutoResizingTextarea";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { DUMMY_LONG_TEXT } from "@/constants/dummy";
import { useModelStore } from "@/store/model";
import { conversation } from "@/db/schema";
import { useParams, useRouter } from "next/navigation";
import { addMessages, createConversation } from "@/actions/conversation";
import { CHAT_ROUTES } from "@/constants/routes";
//
type Props = {
    initialMessages?: TMessage[];
}
export function Chat({ initialMessages }: Props) {
    //***chatGpt 연결 => key 받기 =>app/api/chat/route.ts => openAi api 연동 후 아래 useChat import
    //message :  사용자 챗봇 배열 담겨져있음

    const params = useParams<{ conversationId: string }>();
    const router = useRouter();
    const { messages, setMessages, input, handleInputChange, handleSubmit } = useChat({
        onFinish: async (message) => {
            //파라미터에 응답 스트림이 모두 끝날 떄 호출 되는 onFinish 콜백 함수
            //param => conversationId가 없으면 새로운 대화 페이지
            if (!params.conversationId) {
                //1. create conversation
                const conversation = await createConversation(input);
                console.log(conversation)
                //2.add message
                //=>addMessage Action 
                await addMessages(conversation.id, input, message.content); //메세지 conversation id, user가 입력한 input , onFinish 답변

                router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`)
            } else {
                //param => conversationId 가 있으면 기존 대화 페이지
                //1. add message

                await addMessages(params.conversationId, input, message.content)
            }

        }
    });
    const mdoel = useModelStore((state) => state.model)
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialMessages) {
            setMessages(initialMessages);
        }
    }, [initialMessages, setMessages])
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" }) //스무스옵션
        }
    }, [messages])
    return <div className="flex flex-col w-[80%] h-full mx-auto">
        {/* 채팅영역  */}
        <div className="flex-1"> {messages.length === 0 ?
            (<Empty />)
            : (<>
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        name={'user'}
                        content={message.content}
                        role={message.role}
                    />
                ))
                }
            </>)}</div>
        {/* input 영역  */}
        <div className="pb-8 sticky bottom-0 bg-white" >
            <form className="flex items-center justify-center gap-4" onSubmit={(e) => handleSubmit(e, { data: { mdoel } })}>
                <AutoResizingTextarea
                    value={input}
                    onChange={handleInputChange} />
                <Button type="submit" size="icon">
                    <ArrowUp />
                </Button>
            </form>
        </div>
        <div ref={scrollRef}></div>
    </div >

}

