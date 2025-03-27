import { BASE_URL } from "@/constants/routes";
import Link from "next/link";
import Image from 'next/image';

export function Logo() {
    return <Link href={BASE_URL} className="flex items-center gap-2">
        {/* 퍼블릭은 생략가능   */}
        <Image width={90} height={90} src="/logo4.png" alt="logo"></Image>


    </Link>
}