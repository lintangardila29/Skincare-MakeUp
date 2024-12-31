import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { productFormSchema, ProductFormValues } from '@/Lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { CheckCircleIcon, ChevronsUpDownIcon, EyeIcon, EyeOffIcon, MoreHorizontalIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { cn } from '@/Lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command';
import { Brand, Category } from '@/types/model';
import { Heading } from '../ui/heading';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getImageSrc } from '@/Lib/getImageSrc';

export default function ProductForm({
    defaultValues,
    brands,
    categories,
}: {
    defaultValues?: any | null;
    brands: Brand[];
    categories: Category[]
}) {
    {/* @ts-expect-error idk how to fix this */ }
    const [image, setImage] = useState<File | undefined>(getImageSrc(defaultValues?.image));
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const title = defaultValues ? "Edit Produk" : "Buat Produk";
    const description = defaultValues ? `Edit ${defaultValues.name}` : "Tambah produk baru";

    const formSchema = productFormSchema();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            brand_id: defaultValues?.brand_id ?? null,
            category_id: defaultValues?.category_id ?? null,
            name: defaultValues?.name ?? "",
            description: defaultValues?.description ?? "",
            price: defaultValues?.price ?? "",
            image: null,
            ctaLink: defaultValues?.ctaLink ?? "",
        },
    })

    async function onSubmit(values: ProductFormValues) {
        setLoading(true);
        const validatedFields = formSchema.parse(values);

        if (!validatedFields) {
            return toast.error("Error", {
                description: `Gagal validasi data.`,
            });
        }

        try {
            if (defaultValues) {
                router.post(`/dashboard/products/${defaultValues.id}`, { _method: "PUT", ...validatedFields, image: validatedFields.image });
            } else {
                router.post("/dashboard/products", { ...validatedFields, image: validatedFields.image });
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        {/* @ts-expect-error idk how to fix this */ }
        setImage(URL.createObjectURL(e.target.files[0]))
        form.setValue('image', e.target.files?.[0])
    }

    return (
        <>
            <div className="flex items-center justify-center md:justify-between">
                <Heading title={title} description={description} />
            </div>
            <Separator />
            <Form {...form}>
                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <div className='flex items-center justify-center'>
                        <Avatar className="h-44 w-44 my-2">
                            {/* @ts-expect-error i dunno how to fix this */}
                            <AvatarImage src={image ?? ""} alt={defaultValues?.name?.[0] ?? ""} />
                            <AvatarFallback>{defaultValues ? defaultValues.name?.[0] : form.getValues('name')}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <Input name='product_image' className='w-full md:max-w-max py-1.5' type="file" accept="image/*" onChange={e => handleImageChange(e)} />
                    </div>
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Harga</FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="brand_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col pt-1">
                                    <FormLabel className="mb-1.5">Brand</FormLabel>
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
                                                            ? brands.find(
                                                                (brand) => brand.id === field.value
                                                            )?.name
                                                            : "Pilih Brand"}
                                                    </span>
                                                    <ChevronsUpDownIcon className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Cari Brand..."
                                                    className="h-9 border-none ring-0 focus:ring-0"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>Tidak ada hasil.</CommandEmpty>
                                                    <CommandGroup>
                                                        {brands.map((brand) => (
                                                            <CommandItem
                                                                value={brand.name}
                                                                key={brand.id}
                                                                onSelect={() => {
                                                                    form.setValue("brand_id", brand.id)
                                                                }}
                                                                disabled={loading}
                                                                className="hover:cursor-pointer"
                                                            >
                                                                {brand.name}
                                                                <CheckCircleIcon
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        brand.id === field.value
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
                        <FormField
                            control={form.control}
                            name="category_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col pt-1">
                                    <FormLabel className="mb-1.5">Kategori</FormLabel>
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
                                                            ? categories.find(
                                                                (category) => category.id === field.value
                                                            )?.name
                                                            : "Pilih Kategori"}
                                                    </span>
                                                    <ChevronsUpDownIcon className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Cari Kategori..."
                                                    className="h-9 border-none ring-0 focus:ring-0"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>Tidak ada hasil.</CommandEmpty>
                                                    <CommandGroup>
                                                        {categories.map((category) => (
                                                            <CommandItem
                                                                value={category.name}
                                                                key={category.id}
                                                                onSelect={() => {
                                                                    form.setValue("category_id", category.id)
                                                                }}
                                                                disabled={loading}
                                                                className="hover:cursor-pointer"
                                                            >
                                                                {category.name}
                                                                <CheckCircleIcon
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        category.id === field.value
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
                        <FormField
                            control={form.control}
                            name="ctaLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CTA Link</FormLabel>
                                    <FormControl>
                                        {/* @ts-expect-error nullable link */}
                                        <Input type='url' disabled={loading} {...field} />
                                    </FormControl>
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
