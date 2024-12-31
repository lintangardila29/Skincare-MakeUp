"use client";

import { Button } from "@/Components/ui/button";
import { useTheme } from "@/ThemeProvider";
import { MoonIcon, SunIcon } from "lucide-react";
type CompProps = {};
export default function ThemeToggle({ }: CompProps) {
    const { toggleTheme } = useTheme();
    return (
        <Button onClick={() => toggleTheme()} variant="ghost" size="icon" className="rounded-full">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon onClick={() => toggleTheme()} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
