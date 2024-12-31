"use client";
import { DashboardNav } from "@/Components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { getNavItems } from "@/Lib/getNavItems";
import { Link, usePage } from "@inertiajs/react";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

export function MobileSidebar() {
    const { auth } = usePage().props;
    const menuItems = getNavItems(auth);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent side="right" className="!px-0">
                    <div className="px-3 mt-4">
                        <span className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:cursor-pointer">
                            <Link href="/" className="text-2xl font-bold text-primary">BeautyBoost</Link>
                        </span>
                    </div>
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <div className="space-y-1">
                                <DashboardNav items={menuItems} isSidebar={true} setOpen={setOpen} />
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
