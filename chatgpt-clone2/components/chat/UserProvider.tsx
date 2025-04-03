'use client'

import { verifySession } from "@/actions/sessions"
import { useUserStore } from "@/store/user"
import { useEffect } from "react"

export function UserProvider({ children }: { children: React.ReactNode }) {
    const udateUser = useUserStore((state) => state.updateUser)

    useEffect(() => {
        const setUser = async () => {
            const user = await verifySession();

            if (user) {
                udateUser(user);

            }
        }

        setUser();
    }, [])

    return <>{children}</>
}