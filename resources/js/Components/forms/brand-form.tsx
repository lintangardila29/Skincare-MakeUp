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
import { brandFormSchema, BrandFormValues } from '@/Lib/form-schema'
import { Brand } from '@/types/model'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { router } from '@inertiajs/react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { getImageSrc } from '@/Lib/getImageSrc'

type BrandFormProps = {
    defaultValues?: Brand | BrandFormValues
    children?: React.ReactNode
}

const BrandForm: React.FC<BrandFormProps> = ({ defaultValues, children }) => {
    const [loading, setLoading] = useState(false);
    {/* @ts-expect-error idk how to fix this */ }
    const [image, setImage] = useState<File | undefined>(getImageSrc(defaultValues?.logo));
    const [open, setOpen] = React.useState(false)
    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandFormSchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            logo: null,
            website: defaultValues?.website ?? '',
            description: defaultValues?.description ?? '',
        }
    })

    async function onSubmit(values: BrandFormValues) {
        setLoading(true)
        const validatedFields = brandFormSchema.parse(values);

        if (!validatedFields) {
            return toast.error("Update Profile Gagal", {
                description: `Gagal validasi data.`,
            });
        }

        try {
            if (defaultValues) {
                router.post(`/dashboard/brands/${defaultValues.id}`, { _method: "PUT", ...validatedFields, logo: validatedFields.logo });
            } else {
                router.post(`/dashboard/brands`, { ...validatedFields, logo: validatedFields.logo });
            }
            form.reset();
            setOpen(false)
            router.flush(`/dashboard/brands`);
        } catch (err: any) {
            toast.error("Gagal membuat brand", {
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        {/* @ts-expect-error idk how to fix this */ }
        setImage(URL.createObjectURL(e.target.files[0]))
        form.setValue('logo', e.target.files?.[0])
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
                            <DialogTitle>Brand</DialogTitle>
                            <DialogDescription>
                                Buat brand baru
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex items-center justify-center'>
                            <Avatar className="h-44 w-44 my-2">
                                {/* @ts-expect-error i dunno how to fix this */}
                                <AvatarImage src={image ?? ""} alt={defaultValues?.name?.[0] ?? ""} />
                                <AvatarFallback>{defaultValues ? defaultValues.name?.[0] : form.getValues('name')}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='flex items-center justify-center gap-4'>
                            <Input name='brand_logo' className='w-full md:max-w-max py-1.5' type="file" accept="image/*" onChange={e => handleImageChange(e)} />
                        </div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Brand</FormLabel>
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
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        {/* @ts-expect-error nullable link */}
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

export default BrandForm;
