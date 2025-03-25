'use server'
import { getUserByEmail } from "@/data/user";
import { LgoinSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { createSession } from "./sessions";
import { redirect } from "next/navigation";

// 함수가 서버에 실행됨

//첫번째 인자값 기존 상태 값을 받지만 인자값을 사용하지 않으면 "_" 로 넣어줌
//server Actions 방식에는 formData 가 자동으로 전달됨
//<form action={login}> → 폼을 제출하면 login(formData)가 실행됨


//useActionState
//  const [error, action] = useActionState(login, undefined);
//return (
//    <form action= { action } >
//✔️ useActionState를 사용하면 login의 실행 결과를 error 상태로 관리 가능
//✔️ 로그인 실패 시 errorMessage를 화면에 표시
export const login = async (_: any, formData: FormData) => {

    //1.validDate Fields
    const validateFields = LgoinSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });
    if (!validateFields.success) {
        return {
            errorMessage: "잘못된 입력값이 있습니다"
        };
    }
    //2.존재하는 사용자인지 체크
    const { email, password } = validateFields.data;
    try {
        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            return {
                errorMessage: '존재하지 않는 사용자입니다. 회원가입을 해주세요.'
            }
        }

        const { id, name, password: userPassword } = existingUser;
        const passwordMatch = await bcrypt.compare(password, userPassword)

        if (!passwordMatch) {
            return {
                errorMessage: '비밀번호가 일치하지 않습니다'
            }
        }

        //세션 생성
        await createSession({ id, name })
        console.log(createSession)
    } catch (error) {
        console.error(`error`, error)
        return {
            errorMessage: "문제가 발생했습니다."
        }
    }
    redirect("/")
}