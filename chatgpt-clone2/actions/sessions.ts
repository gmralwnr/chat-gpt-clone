'use server';
import { createSecretKey } from "crypto";
import { Session } from "inspector/promises";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);
const key = createSecretKey(Buffer.from(encodeKey));

type SessionPayload = {
    id: string;
    name: string;
}

export const encrypt = async (payload: SessionPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime("1d")
        //  .sign(encodeKey);
        .sign(key)
}

export const verify = async (session: string | undefined = "") => {
    try {
        const { payload } = await jwtVerify<SessionPayload>(session, encodeKey, {
            algorithms: ["HS256"]
        });
        return payload;

    } catch (error) {
        console.error("토큰 검증에 실패하였습니다")
    }
};

export const createSession = async (payload: SessionPayload) => {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 60 * 1000);
    const session = await encrypt(payload);

    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    cookieStore.set("session", session, {

        httpOnly: true, //자바스크립트에서 접근 할 수 없도록 
        secure: true,   // https에서 쿠키가 전송 될 수 있었던거 
        expires: expiresAt,
        sameSite: 'lax', //크로스 사인 요청 
        path: "/"

    })
}

//쿠키 삭제
export const deleteSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("session");

}

//검증 함수
export const verifySession = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session')?.value;
    const session = await verify(cookie);

    if (!session?.id) {
        redirect("/login");
    }

    return session;
}