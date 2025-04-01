'use client'
import { Menu } from "lucide-react";
import {
    Sheet, SheetContent, SheetTrigger,
} from "../ui/sheet";
import { SideBar } from "./SideBar";
import { useSheetStore } from "@/store/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


export function MobileMenu() {
    const open = useSheetStore((state) => state.open);
    const setOpen = useSheetStore((state) => state.setOpen);

    return <div className="lg:hidden">
        <Sheet open={open} onOpenChange={(open) => setOpen(open)}
        >
            <SheetTrigger asChild><Menu /></SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SideBar />
                <VisuallyHidden>
                    {/* 제목 추가 */}
                    <DialogTitle></DialogTitle> 제목 추가
                </VisuallyHidden>
            </SheetContent>
        </Sheet>
    </div>

}