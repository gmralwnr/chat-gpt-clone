import Link from "next/link"; // ✅ Next.js의 Link 컴포넌트 사용
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
type Props = {
    title: string;
    footer: { label: string; href: string };
    children: React.ReactNode;
};

export function FormCard({ title, footer, children }: Props) {
    return (
        <Card className="w-[500px] flex flex-col items-center border">
            <CardHeader>
                <CardTitle className="w-[80px]">{title}</CardTitle>
            </CardHeader>
            <CardContent className="w-[90%]">
                {children}
            </CardContent>
            <CardFooter>
                <Link className="text-sm text-sky-700" href={footer.href}> {footer.label}</Link>
            </CardFooter>
        </Card >
    );
}