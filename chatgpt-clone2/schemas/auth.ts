import { z } from "zod";

export const SignupSchema = z.object({
    name: z
        .string() //string type
        .min(1, { message: "이름을 입력해주세요" }) //최소 한글자 부터 
        .regex(/^[a-zA-ZRㄱ-ㅎ가-힣]+$/, { //한글 영어만 받도록 
            message: "이름은 문자만 입력할 수 있습니다"
        }),
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요" }),
    password: z
        .string()
        .min(8, { message: "페스워드는 최소 1개 이상의 대문자를 포함해야 합니다." })
        .regex(/[A-Z]/, {
            message: "패스워드는 최소 1개 이상 대문자를 포함해야합니다"
        })
        .regex(/[a-z]/, {
            message: "패스워드는 최소 1개 이상 소문문자를 포함해야합니다"
        })
        .regex(/[0-9]/, {
            message: "패스워드는 최소 1개 이상 숫자를를 포함해야합니다"
        })
        .regex(/[\W_]/, {
            message: "패스워드는 최소 1개 이상 특수문자를 포함해야합니다"
        }),


})