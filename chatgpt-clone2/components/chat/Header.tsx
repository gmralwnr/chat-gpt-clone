import { MobileMenu } from "./MobileMenu";
import { MobileSelect } from "./MobileSelect";

export function Header() {
    return <header className="flex items-center p-2">
        {/* 모바일 메뉴 영역 */}
        <MobileMenu></MobileMenu>
        {/* 모델 선택 영역 */}
        <MobileSelect />
    </header>
}