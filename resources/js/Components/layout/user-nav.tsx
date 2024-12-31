"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { getImageSrc } from "@/Lib/getImageSrc";
import { User } from "@/types/model";
import { Link, router, } from "@inertiajs/react";

export function UserNav({ user }: { user: User }) {
    return (
        <>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={getImageSrc(user.avatar) ?? ""}
                                alt={user.name ?? ""}
                            />
                            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium leading-none">
                                {user.name}
                            </span>
                            <span className="text-sm uppercase leading-none">
                                {user.role?.name}
                            </span>
                            <span className="text-xs max-w-52 leading-none text-muted-foreground">
                                {user.email}
                            </span>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="hover:cursor-pointer">
                            <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.post('/logout')} className="hover:cursor-pointer">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent >
            </DropdownMenu >
        </>
    );
    //   }
}
