import { Header } from "@/components/chat/Header";
import { SideBar } from "@/components/chat/SideBar";
import { UserProvider } from "@/components/chat/UserProvider";
import React from "react";

export default function ChatLayout({ children }
    : { children: React.ReactNode }) {

    return (
        < UserProvider >
            <div className="md:flex h-full">
                {/* 사이드바 영역 */}
                <div className="hidden md:block w-[300px]"><SideBar /></div>
                {/* Header +chat 영역 */}
                <div className="flex flex-col flex-1 h-full overflow-y-auto ">
                    <Header />
                    {children}
                </div>
            </div>
        </UserProvider >

    )
} 