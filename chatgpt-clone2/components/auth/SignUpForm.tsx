'use client'
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { FormCard } from "./FormCard";
import { Submit } from "./Submit";
import { ChangeEvent, useActionState, useEffect } from "react";
import { useFormValidate } from "@/hooks/useFormValidate";
import { SignupSchema } from "@/schemas/auth";
import { TSingUpFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import { signUp } from "@/actions/signup";
import toast from "react-hot-toast";


export function SignUpForm() {
    {/*useActionState signUp 서버액션 시작 error 는 서버 실행 결과 "use server"*/ }

    const [error, action] = useActionState(signUp, undefined); //실제 data가 존재한다면 error 
    const { errors, validateField } = useFormValidate<TSingUpFormError>(SignupSchema);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        validateField(name, value);
    };

    useEffect(() => {
        if (error?.errorMessage) {
            toast.error(error.errorMessage)
        }
    }, [error]);
    return (
        <FormCard title="회원가입" footer={{ label: "이미 계정이 있으신가요", href: "/signup" }}>

            {/*action 실행  */}
            <form action={action} className="space-y-6">
                {/*이름*/}
                <div className="space-y-1">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" name="name" placeholder="이름을 입력해주세요" onChange={handleChange} error={!!errors?.name} />
                    {errors?.name && <FormMessage message={errors?.name[0]} />}
                </div>
                {/*이메일*/}
                <div className="space-y-1">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" name="email" type="email" placeholder="이메일을 입력해주세요" onChange={handleChange}
                        error={!!errors?.email} />
                    {errors?.email && <FormMessage message={errors?.email[0]} />}

                </div>
                {/*비밀번호*/}
                <div className="space-y-1">
                    <Label htmlFor="password">비밀번호</Label>
                    <Input id="password" name="password" type="password" placeholder="***********" onChange={handleChange} error={!!errors?.password} />
                    {errors?.password && <FormMessage message={errors?.password[0]} />}

                </div>
                {/*submit =>form tag 전달 => form 태그 action 태그가 실행됨 */}
                <Submit className="w-full">가입하기</Submit>

            </form>
        </FormCard>
    )
}

