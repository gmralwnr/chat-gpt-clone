'use server'
import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import { verifySession } from "./sessions"
import db from "@/db";
import { conversation, message } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

//대화내용 insert
export const addMessages = async (
    conversationId: string,  //어떤 사람과 대화를 나누었는지 id
    userContent: string, //유저의 메세지
    assistantContent: string //assistant 메세지
) => {
    await db.insert(message).values({
        conversationId,
        content: userContent,
        role: "user"
    })

    await db.insert(message).values({
        conversationId,
        content: assistantContent,
        role: "assistant"
    })
    //결과 바로 반영 하기 위한 revalidatePath 파라미터로 넘어온 경로의 페이지를 재 검증 
    //=> file system sement url 경로   
    revalidatePath(`${CHAT_ROUTES.CONVERSATIONS}/${conversationId}`);

}

//새로운 질문 추가 
export const createConversation = async (name: string) => {
    const session = await verifySession();

    const result = await db.insert(conversation).values({
        name,
        userId: session.id,

    })
        .returning(); //result 에 담기게 returning 하기
    revalidatePath(BASE_URL);

    return result[0] //리터링 값은 배열이기 때문에 0번쨰 값
}

//사이드바 title 수정 
export const updateConversation = async (id: string, name: string) => {
    await db
        .update(conversation)
        .set({ name, updatedAt: new Date() })
        .where(eq(conversation.id, id))

    revalidatePath(BASE_URL) //ui 반영하기 위해 revalidatePath
}


export const deleteConversation = async (id: string) => {
    await db.delete(conversation).where(eq(conversation.id, id))

    revalidatePath(BASE_URL)
}
