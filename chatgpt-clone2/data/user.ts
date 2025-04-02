import { verifySession } from "@/actions/sessions";
import db from "@/db"
import { conversation, user } from "@/db/schema";
import { User } from "@/types/db";
import { verify } from "crypto";
import { eq } from "drizzle-orm";
// 등록된 이메일 주소 or  값이 있는지 확인 조회 
export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const existingUser = await db.query.user.findFirst({
            where: eq(user.email, email),
        });
        console.log(">>>>>existingUser>>>", existingUser)
        if (!existingUser) {
            console.log(">>>>>로그인 값 조회>>>", existingUser)

            return null;
        }

        return existingUser;

    } catch (error) {
        console.error('errorerrorerrorerrorerrorerrorerrorerror', error);

        console.error('error', error);
        throw new Error('문제가 발생했습니다.')
    }
};


//sidebar 내용 가져오기
//유저의 대화 목록 파일 가져오기
export const getConversationsByUser = async () => {
    //verifySession 현재 유저 정보가져오기 
    const session = await verifySession();
    //user 테이블에서 findFirst where 조건으로 user 정보를 조회한다.
    const responses = await db.query.user.findFirst({
        where: eq(user.id, session.id),
        //with => 해당 테이블이 관계를 가지고 있는 값을 응답 
        with: {
            //해당 user 대화를 가지고 올 수 있음 
            converstation: {
                orderBy: (conversation, { desc }) => [desc(conversation.updatedAt)]
            }
        }
    })
    return responses?.converstation || []  //값이 없을 땐 빈 옵션 
}
