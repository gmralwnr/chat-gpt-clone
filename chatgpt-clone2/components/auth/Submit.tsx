import { Button, ButtonProps } from "../ui/button";

export function Submit({ children, ...othres }: ButtonProps) {
    console.log(children, { ...othres })
    return <Button type="submit"{...othres}>{children}</Button>
}