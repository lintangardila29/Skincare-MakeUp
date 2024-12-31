import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { cn } from "@/Lib/utils"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { registerFormSchema, RegisterFormValues } from "@/Lib/form-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useTheme } from "@/ThemeProvider";
import { Link, router } from "@inertiajs/react";
import { EyeIcon, EyeOffIcon, MoreHorizontalIcon } from "lucide-react";

export function Register({
    status,
    canResetPassword,
    className,
    ...props
}: React.ComponentProps<"div"> & {
    status?: string;
    canResetPassword: boolean;
}) {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [isView, setIsView] = useState(false);
    const [isViewConfirm, setIsViewConfirm] = useState(false);
    const turnstileRef = useRef<TurnstileInstance>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    })

    async function onSubmit(values: RegisterFormValues) {
        setLoading(true);
        const formDataRef = new FormData(formRef.current!);
        const honeyPot = formDataRef.get("very-secret-honeypot");

        if (honeyPot) {
            setLoading(false);
            return toast.error(`Registrasi Gagal`, {
                description: `Spam terdeteksi.`,
            });
        }

        const validatedFields = registerFormSchema.parse(values);

        if (!validatedFields) {
            return toast.error("Registrasi Gagal", {
                description: `Gagal validasi data.`,
            });
        }

        try {
            await axios.post('/register', { ...validatedFields, email: validatedFields.email.toLowerCase() });
            toast.success("Registrasi berhasil.");
            router.flushAll()
            router.visit("/profile")
        } catch (err: AxiosError | any) {
            toast.error("Registrasi Gagal", {
                description: `Error ${err.response.status}: ${err.response.data.message}`,
                action: {
                    label: "Coba lagi",
                    onClick: async () => await onSubmit(values),
                },
            });
            setLoading(false);
            form.reset();
            turnstileRef.current?.reset();
        }
    }

    return (
        <div className="flex min-h-[90svh] flex-col items-center justify-center bg-background p-6">
            <div className="w-full max-w-sm md:max-w-4xl">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="overflow-hidden">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <Form {...form}>
                                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Register</h1>
                                    </div>
                                    {/* Honeypot */}
                                    <input
                                        type="text"
                                        name="very-secret-honeypot"
                                        className="opacity-0 absolute -z-10"
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />
                                    <div className="flex flex-col gap-4 mt-2">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nama</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} type="name" placeholder="John Doe" {...field} />
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
                                                        <Input disabled={loading} type="email" autoComplete="username" placeholder="john.doe@gmail.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Password</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Input disabled={loading} type={isView ? "text" : "password"} autoComplete="current-password" placeholder="*****" {...field} />
                                                                {isView ? (
                                                                    <Button
                                                                        onClick={() => {
                                                                            setIsView(!isView)
                                                                        }}
                                                                        disabled={loading}
                                                                        aria-hidden="true"
                                                                        type="button" size="icon" variant="ghost" className="absolute h-6 w-6 p-2 top-1.5 right-2">
                                                                        <EyeIcon />
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        onClick={() => {
                                                                            setIsView(!isView)
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
                                            <FormField
                                                control={form.control}
                                                name="password_confirmation"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Konfirmasi Password</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Input disabled={loading} type={isViewConfirm ? "text" : "password"} placeholder="*****" {...field} />
                                                                {isViewConfirm ? (
                                                                    <Button
                                                                        onClick={() => {
                                                                            setIsViewConfirm(!isViewConfirm)
                                                                        }}
                                                                        disabled={loading}
                                                                        aria-hidden="true"
                                                                        type="button" size="icon" variant="ghost" className="absolute h-6 w-6 p-2 top-1.5 right-2">
                                                                        <EyeIcon />
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        onClick={() => {
                                                                            setIsViewConfirm(!isViewConfirm)
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
                                        </div>
                                        <Button disabled={loading} type="submit" className="w-full">
                                            {loading ? <MoreHorizontalIcon className={loading ? "animate-pulse" : ""} /> : "Register"}
                                        </Button>
                                        <div className="text-center text-sm">
                                            Sudah punya akun?{" "}
                                            <Link href="/login" prefetch={['mount', 'hover']}>
                                                <Button variant="link" className="h-max p-0">Login</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                            <div className="relative hidden bg-muted md:block">
                                <img
                                    src="/hero.jpg"
                                    alt="Image"
                                    className="absolute inset-0 h-full w-full object-cover brightness-[0.7]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Register;
