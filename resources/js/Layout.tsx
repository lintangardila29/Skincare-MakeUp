import Header from "@/Components/layout/header";
import { Toaster } from "@/Components/ui/sonner";
import { Head, usePage } from "@inertiajs/react";
import { ThemeProvider } from "./ThemeProvider";
import { toast } from "sonner";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { flash } = usePage().props;
    if (flash?.success) {
        toast.success(flash?.success);
    } else if (flash?.error) {
        toast.error(flash?.error);
    }
    return (
        <ThemeProvider>
            <Head title={"Skincare & Make up"} />
            <Header />
            <div className="flex overflow-hidden">
                <main className="w-full mt-14">{children}</main>
            </div>
            <Toaster
                position="top-center"
                expand visibleToasts={2}
                richColors
            />
        </ThemeProvider>
    );
}
