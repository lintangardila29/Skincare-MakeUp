"use client";

import { Icons } from "@/Components/icons";
import { cn } from "@/Lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Link } from "@inertiajs/react";
import { NavItem } from "@/types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ChevronDown } from "lucide-react";

interface DashboardNavProps {
    className?: string;
    items: NavItem[];
    isSidebar?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ className, items, isSidebar, setOpen }: DashboardNavProps) {
    const pathname = window.location.pathname;
    if (!items?.length) {
        return null;
    }
    const isActive = (href: string) => {
        return (
            (pathname === "/dashboard" && href === "/dashboard")
            || (href !== "/dashboard" && pathname.startsWith(href))
            || (href === ("reports") && pathname.includes("report"))
        )
    }
    return (
        <nav className={cn("grid items-start", isSidebar && "gap-2", className)}>
            {items.map((item, index) => {
                const Icon = Icons[item.icon || "arrowRight"];
                if (item.children) {
                    return (
                        <HoverCard key={index}>
                            <HoverCardTrigger className="group">
                                <span
                                    className={cn(
                                        "group hover:cursor-pointer flex justify-between items-center px-3 py-2 text-sm font-medium hover:text-primary-500 transition duration-150 ease-in-out",
                                        !isSidebar && "border-b-2 border-b-transparent hover:border-b-primary-500",
                                        isActive(item.href as string) && !isSidebar ? "border-b-primary-500" : "transparent",
                                        isActive(item.href as string) && isSidebar ? "bg-accent text-primary-500" : "transparent",
                                        isSidebar && "hover:bg-accent rounded-md",
                                        item.disabled && "cursor-not-allowed opacity-80",
                                    )}
                                >
                                    <div className="flex items-center" >
                                        <Icon className="mr-2 h-4 w-4" />
                                        <span>{item.title}</span>
                                    </div>
                                    <ChevronDown
                                        className="relative top-[1px] ml-1 h-4 w-4 group-hover:text-primary-500 transition delay-500 duration-500 group-hover:rotate-180"
                                        aria-hidden="true"
                                    />
                                </span>
                            </HoverCardTrigger>
                            <HoverCardContent className="p-2">
                                {item.children.map((child, index) => {
                                    return child.href && (
                                        <Link
                                            key={index}
                                            href={child.disabled ? "/" : child.href}
                                            onClick={() => {
                                                if (setOpen) setOpen(false);
                                            }}
                                            prefetch={['mount', 'hover']} cacheFor="5m"
                                            className="relative group"
                                        >
                                            <span
                                                className={cn(
                                                    "group flex items-center px-3 py-2 text-sm font-medium hover:text-primary-500 transition duration-150 ease-in-out",
                                                    !isSidebar && "border-b-2 border-b-transparent hover:border-b-primary-500",
                                                    isActive(child.href) && !isSidebar ? "border-b-primary-500" : "transparent",
                                                    isActive(child.href) && isSidebar ? "bg-accent text-primary-500" : "transparent",
                                                    isSidebar && "hover:bg-accent rounded-md",
                                                    child.disabled && "cursor-not-allowed opacity-80",
                                                )}
                                            >
                                                <Icon className="mr-2 h-4 w-4" />
                                                <span>{child.title}</span>
                                            </span>
                                        </Link>
                                    )
                                })}
                            </HoverCardContent>
                        </HoverCard>
                    )
                }
                return (
                    item.href && (
                        <Link
                            key={index}
                            href={item.disabled ? "/" : item.href}
                            onClick={() => {
                                if (setOpen) setOpen(false);
                            }}
                            prefetch={['mount', 'hover']} cacheFor="5m"
                            className="relative group"
                        >
                            <span
                                className={cn(
                                    "group flex items-center px-3 py-2 text-sm font-medium hover:text-primary-500 transition duration-150 ease-in-out",
                                    !isSidebar && "border-b-2 border-b-transparent hover:border-b-primary-500",
                                    isActive(item.href) && !isSidebar ? "border-b-primary-500" : "transparent",
                                    isActive(item.href) && isSidebar ? "bg-accent text-primary-500" : "transparent",
                                    isSidebar && "hover:bg-accent rounded-md",
                                    item.disabled && "cursor-not-allowed opacity-80",
                                )}
                            >
                                <Icon className="mr-2 h-4 w-4" />
                                <span>{item.title}</span>
                            </span>
                        </Link>
                    )
                );
            })}
        </nav>
    );
}
