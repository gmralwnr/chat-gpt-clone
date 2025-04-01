'use client'
import { useEffect, useRef, useState } from "react";
import { AutoResizingTextarea } from "./AutoResizingTextarea";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { DUMMY_LONG_TEXT } from "@/constants/dummy";

const MESSAGE_DUMMY = [
    { id: "1", content: "데이터데이터1", role: "user" },
    { id: "2", content: "데이터데이터2", role: "assistant" },
    { id: "3", content: "데이터데이터1", role: "user" },
    { id: "4", content: "데이터데이터1", role: "user" },
    { id: "5", content: "데이터데이터1", role: "user" },
    { id: "6", content: DUMMY_LONG_TEXT, role: "assistant" },

];
export function Chat() {
    const [value, setValue] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" }) //스무스옵션
        }
    }, [])
    return <div className="flex flex-col w-[80%] h-full mx-auto">
        {/* 채팅영역  */}
        <div className="flex-1"> {MESSAGE_DUMMY.length === 0 ?
            (<Empty />)
            : (<>
                {MESSAGE_DUMMY.map((message) => (
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
            <form className="flex items-center justify-center gap-4">
                <AutoResizingTextarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />
                <Button type="submit" size="icon">
                    <ArrowUp />
                </Button>
            </form>
        </div>
        <div ref={scrollRef}></div>
    </div >

}