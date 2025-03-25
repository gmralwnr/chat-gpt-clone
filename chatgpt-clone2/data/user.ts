import db from "@/db"
import { user } from "@/db/schema";
import { User } from "@/types/db";
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
