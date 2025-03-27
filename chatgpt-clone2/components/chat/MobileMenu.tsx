import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../ui/sheet";
import { SideBar } from "./SideBar";

export function MobileMenu() {
    return <div className="lg:hidden">
        <Sheet>
            <SheetTrigger asChild><Menu /></SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SideBar />
            </SheetContent>
        </Sheet>
    </div>

}