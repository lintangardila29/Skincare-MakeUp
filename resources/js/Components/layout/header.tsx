import ThemeToggle from "@/Components/layout/theme-toggle";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import { Link, usePage } from "@inertiajs/react"
import { DashboardNav } from "../dashboard-nav";
import { getNavItems } from "@/Lib/getNavItems";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import NotifNav from "./notif-nav";

export default function Header() {
    const { auth } = usePage().props;
    const menuItems = auth?.user ? getNavItems(auth) : [];

    const [sticky, setSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleStickyNavbar = () => {
            setSticky(window.scrollY >= 30);
        };
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener("scroll", handleStickyNavbar);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("scroll", handleStickyNavbar);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const topMenuItems = menuItems.slice(0, 7);

    return (
        <div className={`w-full z-50 fixed top-0 left-0 right-0 ${sticky || isMobile
            ? "dark:bg-background-2 dark:shadow-sticky-dark fixed z-[50] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm animate-in slide-in-from-top-6 transition duration-500 ease-in-out"
            : "absolute bg-transparent transition duration-500 ease-in-out"
            }`}>
            <nav className="container px-4 h-14 flex items-center justify-between">
                <div className="flex items-center justify-center">
                    <Link href="/" className="text-2xl font-bold text-primary">BeautyBoost</Link>
                </div>
                <div className="w-max hidden xl:flex flex-col items-center gap-2">
                    {location.pathname !== "/" && <DashboardNav items={topMenuItems} className="flex" />}
                </div>
                <div className="flex items-center gap-2">
                    {auth?.user
                        ? (
                            <>
                                <ThemeToggle />
                                <NotifNav auth={auth} />
                                <UserNav user={auth.user} />
                            </>
                        )
                        : (
                            <>
                                <Link href="/login" prefetch={['mount', 'hover']} cacheFor="1m">
                                    <Button variant="link" className="text-foreground text-base font-semibold">Login</Button>
                                </Link>
                                <ThemeToggle />
                            </>
                        )
                    }
                    <div className="hover:cursor-pointer flex items-center justify-center">
                        {menuItems.length > 0 && <MobileSidebar />}
                    </div>
                </div>
            </nav>
        </div>
    );
}
