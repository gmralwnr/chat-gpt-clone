'use client'
// 이벤트 헨들러가 추가 되면 use client  
import { deleteSession } from "@/actions/sessions";
import { Button } from "../ui/button";

export function LogoutButton() {
    return <Button className="w-[80%]" onClick={() => deleteSession()}>
        로그아웃
    </Button>
}