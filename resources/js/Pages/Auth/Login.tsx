import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { cn } from "@/Lib/utils"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { loginFormSchema, LoginFormValues } from "@/Lib/form-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useTheme } from "@/ThemeProvider";
import { Link, router } from "@inertiajs/react";
import { EyeIcon, EyeOffIcon, MoreHorizontalIcon } from "lucide-react";
import { Checkbox } from "@/Components/ui/checkbox";

export function Login({
    status,
    canResetPassword,
    className,
    ...props
}: React.ComponentProps<"div"> & {
    status?: string;
    canResetPassword: boolean;
}) {
    const { theme } = useTheme();
    const [isView, setIsView] = useState(false);
    const [loading, setLoading] = useState(false);
    const turnstileRef = useRef<TurnstileInstance>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    })

    async function onSubmit(values: LoginFormValues) {
        setLoading(true);
        const formDataRef = new FormData(formRef.current!);
        const honeyPot = formDataRef.get("very-secret-honeypot");

        if (honeyPot) {
            setLoading(false);
            return toast.error(`Login Gagal`, {
                description: `Spam terdeteksi.`,
            });
        }

        const validatedFields = loginFormSchema.parse(values);

        if (!validatedFields) {
            return toast.error("Login Gagal", {
                description: `Gagal validasi data.`,
            });
        }

        try {
            await axios.post('/login', { ...validatedFields, email: validatedFields.email.toLowerCase() });
            toast.success("Login berhasil.");
            router.flushAll()
            router.visit("/dashboard")
        } catch (err: AxiosError | any) {
            toast.error("Login Gagal", {
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
        <div className="flex min-h-[90svh] flex-col items-center justify-center bg-background p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <div className={cn("flex flex-col gap-6", className)} {...props}>

                    <Card className="overflow-hidden">
                        <CardContent className="grid p-0 md:grid-cols-2">

                            <Form {...form}>
                                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Login</h1>
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
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className="relative">
                                                    <div className="flex justify-between items-center">
                                                        <FormLabel>Password</FormLabel>
                                                        <Link href="/forgot-password" className="text-muted-foreground text-xs hover:underline hover:text-primary transition-colors duration-150 ease-in-out">Forgot Password?</Link>
                                                    </div>
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
                                            name="remember"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center gap-2">
                                                        <FormControl>
                                                            <Checkbox
                                                                disabled={loading}
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <FormLabel>Remember me</FormLabel>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <Button disabled={loading} type="submit" className="w-full">
                                            {loading ? <MoreHorizontalIcon className={loading ? "animate-pulse" : ""} /> : "Login"}
                                        </Button>
                                        <div className="text-center text-sm">
                                            Belum punya akun?{" "}
                                            <Link href="/register" prefetch={['mount', 'hover']}>
                                                <Button variant="link" className="h-max p-0">Daftar</Button>
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

export default Login;
