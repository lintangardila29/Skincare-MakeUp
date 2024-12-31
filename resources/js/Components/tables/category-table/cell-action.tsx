"use client";
import { AlertModal } from "@/Components/modal/alert-modal";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ClockIcon, CheckCircle2, MoreHorizontal, PencilRulerIcon, Trash } from "lucide-react";
import { router, usePage } from '@inertiajs/react'
import { useState } from "react";
import { Category } from "@/types/model";
import CategoryForm from "@/Components/forms/category-form";
import axios from "axios";
import { toast } from "sonner";

interface CellActionProps {
    data: Category;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const { auth } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onConfirm = async () => {
        setLoading(true);
        const deleteData = axios.delete(`/dashboard/categories/${data.id}`);
        toast.promise(deleteData, {
            loading: 'Menghapus data...',
            success: () => {
                router.reload();
                return `Berhasil menghapus data.`;
            },
            error: (error) => {
                return `Error: ${error.response.data.message}`;
            },
            position: 'top-center',
        })
        setLoading(false);
        setOpen(false);
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {(auth.user.role.name === "Super Admin" &&
                        <>
                            <div className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-amber-400/30 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
                                <PencilRulerIcon className="mr-2 h-4 w-4 text-amber-400" />
                                <CategoryForm defaultValues={data}>
                                    <span>Edit</span>
                                </CategoryForm>
                            </div>
                            <DropdownMenuItem onClick={() => setOpen(true)} className="focus:cursor-pointer focus:bg-red-500/30">
                                <Trash className="mr-2 h-4 w-4 text-red-500" /> Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    );
};
