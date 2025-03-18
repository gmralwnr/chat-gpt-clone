import { useState } from "react";
import { ZodObject, ZodRawShape } from "zod";

export function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {
    const [errors, setErrors] = useState<Partial<T>>();
    const validateField = (name: string, value: string) => {
        setErrors({
            ...errors,
            [name]: undefined,
        });
        const parseValue = schema.pick({ [name]: true }).safeParse({
            [name]: value, //pick = >인자로 받은 name을 값key로 넘겨주고 true 를 주면 true인 것만 가지고 온다
        });
        if (!parseValue.success) {
            setErrors({
                ...errors,
                ...parseValue.error.flatten().fieldErrors
            })
        }

    }

    return { errors, validateField }
}