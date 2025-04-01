'use client'
import { Menu } from "lucide-react";
import {
    Sheet, SheetContent, SheetTrigger,
} from "../ui/sheet";
import { SideBar } from "./SideBar";
import { useSheetStore } from "@/store/sheet";

export function MobileMenu() {
    // const { open, setOpen } = useSheetStore((state) => ({
    //     open: state.open,
    //     setOpen: state.setOpen
    // }));
    return <div className="lg:hidden">
        <Sheet  //open={open} onOpenChange={(open) => setOpen(open)}
        >
            <SheetTrigger asChild><Menu /></SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SideBar />
            </SheetContent>
        </Sheet>
    </div>

}