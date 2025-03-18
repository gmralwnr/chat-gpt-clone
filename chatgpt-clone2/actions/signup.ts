"use server"
import bcrypt from 'bcryptjs';
import { getUserByEmail } from "@/data/user";
import { SignupSchema } from "@/schemas/auth"
import db from '@/db';
import { user } from '@/db/schema';
import { redirect } from "next/navigation";

export const signUp = async (_: any, formData: FormData) => {


    //1.validDate Fields
    const validateFields = SignupSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    });
    if (!validateFields.success) {
        return {
            errorMessage: "잘못된 입력값이 있습니다"
        };
    }
    //2.존재하는 사용자인지 체크
    const { email, name, password } = validateFields.data;
    console.log("?>>>>>>>>>>>>>>", email, name, password)

    try {

        const existingUser = await getUserByEmail(email);
        console.log("?>>>>>existingUser>>>>>>>>>", existingUser)

        if (existingUser) {
            console.log("?>>>>>이미 존재하는 사용자입니다>>>>>>>>>", existingUser)

            return {
                errorMessage: "이미 존재하는 사용자입니다"
            };
        }
        //bcryptjs hash 비밀번호
        //암호화  yarn add bcryptjs  //  yarn add -D @types/bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);


        //3. insert db
        await db.insert(user).values({ name, email, password: hashedPassword });

    } catch (error) {
        console.log('error', error);
        return { errorMessage: '문제가 발생하였습니다.' }
    }
    redirect("/login");

    //4. 성공/실패처리
}