import { cn } from "@/Lib/utils";
import { Link } from "@inertiajs/react";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

type BreadCrumbType = {
    title: string;
    link: string;
};

type BreadCrumbPropsType = {
    items: BreadCrumbType[];
};

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
    return (
        <div className="place-self-center max-w-sm mb-4 flex items-center md:place-self-start md:max-w-full space-x-1 text-sm text-muted-foreground">
            <Link
                href={"/dashboard"}
                className="overflow-hidden text-ellipsis whitespace-nowrap"
                prefetch={['mount', 'hover']} cacheFor="5m"
            >
                Dashboard
            </Link>
            {items?.map((item: BreadCrumbType, index: number) => (
                <React.Fragment key={item.title}>
                    <ChevronRightIcon className="h-4 w-4" />
                    <Link
                        href={item.link}
                        className={cn(
                            "overflow-hidden text-ellipsis font-medium",
                            index === items.length - 1
                                ? "text-foreground pointer-events-none whitespace-nowrap"
                                : "overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground",
                        )}
                        prefetch={['mount', 'hover']} cacheFor="5m"
                    >
                        {item.title}
                    </Link>
                </React.Fragment>
            ))}
        </div>
    );
}
