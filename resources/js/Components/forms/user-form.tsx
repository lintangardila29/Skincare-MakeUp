import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { userFormSchema, UserFormValues } from '@/Lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { CheckCircleIcon, ChevronsUpDownIcon, EyeIcon, EyeOffIcon, MoreHorizontalIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { cn } from '@/Lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command';
import { Role } from '@/types/model';
import { Heading } from '../ui/heading';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getImageSrc } from '@/Lib/getImageSrc';

export default function UserForm({
    defaultValues,
    roles,
}: {
    defaultValues?: any | null;
    roles: Role[];
}) {
    {/* @ts-expect-error idk how to fix this */ }
    const [image, setImage] = useState<File | undefined>(getImageSrc(defaultValues?.image));
    const [loading, setLoading] = useState(false);
    const [isViewPassword, setIsViewPassword] = useState(false);
    const [isViewNewPassword, setIsViewNewPassword] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const title = defaultValues ? "Edit User" : "Buat User";
    const description = defaultValues ? `Edit ${defaultValues.name}` : "Tambah user baru";

    const formSchema = userFormSchema(defaultValues);

    const form = useForm<UserFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: defaultValues?.name ?? "",
            role_id: defaultValues?.role_id ?? 3,
            email: defaultValues?.email ?? "",
            password: "",
            new_password: "",
            email_verified_at: defaultValues?.email_verified_at ?? null,
        },
    })

    async function onSubmit(values: UserFormValues) {
        setLoading(true);
        const validatedFields = formSchema.parse(values);

        if (!validatedFields) {
            return toast.error("Error", {
                description: `Gagal validasi data.`,
            });
        }

        try {
            if (defaultValues) {
                router.put(`/dashboard/users/${defaultValues.id}`, { ...validatedFields });
            } else {
                router.post("/dashboard/users", { ...validatedFields });
            }
        } catch (err: any) {
            toast.error("Error", {
                description: `${err}`,
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
        <>
            <div className="flex items-center justify-center md:justify-between">
                <Heading title={title} description={description} />
            </div>
            <Separator />
            <Form {...form}>
                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {defaultValues ? (
                            <FormField
                                control={form.control}
                                name="new_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password Baru</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input disabled={loading} type={isViewNewPassword ? "text" : "password"} autoComplete="current-password" placeholder="*****" {...field} />
                                                {isViewNewPassword ? (
                                                    <Button
                                                        onClick={() => {
                                                            setIsViewNewPassword(!isViewNewPassword)
                                                        }}
                                                        disabled={loading}
                                                        aria-hidden="true"
                                                        type="button" size="icon" variant="ghost" className="absolute h-6 w-6 p-2 top-1.5 right-2">
                                                        <EyeIcon />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => {
                                                            setIsViewNewPassword(!isViewNewPassword)
                                                        }}
                                                        disabled={loading}
                                                        aria-hidden="true"
                                                        type="button" size="icon" variant="ghost" className="absolute h-6 w-6 p-2 top-1.5 right-2">
                                                        <EyeOffIcon />
                                                    </Button>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input disabled={loading} type={isViewPassword ? "text" : "password"} autoComplete="current-password" placeholder="*****" {...field} />
                                                {isViewPassword ? (
                                                    <Button
                                                        onClick={() => {
                                                            setIsViewPassword(!isViewPassword)
                                                        }}
                                                        disabled={loading}
                                                        aria-hidden="true"
                                                        type="button" size="icon" variant="ghost" className="absolute h-6 w-6 p-2 top-1.5 right-2">
                                                        <EyeIcon />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => {
                                                            setIsViewPassword(!isViewPassword)
                                                        }}
                                                        disabled={loading}
                                                        aria-hidden="true"
                                                        type="button" size="icon" variant="ghost" className="absolute h-6 w-6 p-2 top-1.5 right-2">
                                                        <EyeOffIcon />
                                                    </Button>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="role_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col pt-1">
                                    <FormLabel className="mb-1.5">Role</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <span className="truncate">
                                                        {field.value
                                                            ? roles.find(
                                                                (role) => role.id === field.value
                                                            )?.name
                                                            : "Pilih Role"}
                                                    </span>
                                                    <ChevronsUpDownIcon className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Cari Role..."
                                                    className="h-9 border-none ring-0 focus:ring-0"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>Tidak ada hasil.</CommandEmpty>
                                                    <CommandGroup>
                                                        {roles.map((role) => (
                                                            <CommandItem
                                                                value={role.name}
                                                                key={role.id}
                                                                onSelect={() => {
                                                                    form.setValue("role_id", role.id)
                                                                }}
                                                                disabled={loading}
                                                                className="hover:cursor-pointer"
                                                            >
                                                                {role.name}
                                                                <CheckCircleIcon
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        role.id === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button disabled={loading} type="submit" className="place-self-end uppercase tracking-widest w-max">
                            {loading ? <MoreHorizontalIcon className={loading ? "animate-pulse" : ""} /> : "Save"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
