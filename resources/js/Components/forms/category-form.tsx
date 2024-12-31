import React, { useState } from 'react'
import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { MoreHorizontalIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { categoryFormSchema, CategoryFormValues } from '@/Lib/form-schema'
import { Category } from '@/types/model'
import axios, { AxiosError } from 'axios'
import { router } from '@inertiajs/react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type CategoryFormProps = {
    defaultValues?: Category | CategoryFormValues
    children?: React.ReactNode
}

const CategoryForm: React.FC<CategoryFormProps> = ({ defaultValues, children }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false)
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            description: defaultValues?.description ?? '',
        }
    })

    async function onSubmit(values: CategoryFormValues) {
        setLoading(true)
        const validatedFields = categoryFormSchema.parse(values);

        if (!validatedFields) {
            return toast.error("Update Profile Gagal", {
                description: `Gagal validasi data.`,
            });
        }

        try {
            if (defaultValues) {
                await axios.put(`/dashboard/categories/${defaultValues.id}`, validatedFields);
                toast.success("Kategori berhasil diubah");
            } else {
                await axios.post(`/dashboard/categories`, validatedFields);
                toast.success("Kategori berhasil dibuat");
            }
            form.reset();
            setOpen(false)
            router.flush(`/dashboard/categories`);
            router.reload();
        } catch (err: AxiosError | any) {
            toast.error("Gagal membuat kategori", {
                description: `Error ${err.response.status}: ${err.response.data.message}`,
                action: {
                    label: "Coba lagi",
                    onClick: async () => await onSubmit(values),
                },
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-sm md:max-w-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Kategori</DialogTitle>
                            <DialogDescription>
                                Buat kategori baru
                            </DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Kategori</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="w-full justify-between py-2">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={loading} type="submit">
                                {loading ? <MoreHorizontalIcon className={loading ? "animate-pulse" : ""} /> : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryForm;
