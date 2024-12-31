import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { resetPasswordFormSchema, ResetPasswordFormValues } from "@/Lib/form-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useTheme } from "@/ThemeProvider";
import { Head, router } from "@inertiajs/react";
import { MoreHorizontalIcon } from "lucide-react";

function ForgotPassword() {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const turnstileRef = useRef<TurnstileInstance>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: ResetPasswordFormValues) {
        setLoading(true);
        const formDataRef = new FormData(formRef.current!);
        const honeyPot = formDataRef.get("very-secret-honeypot");

        if (honeyPot) {
            setLoading(false);
            return toast.error(`ResetPassword Gagal`, {
                description: `Spam terdeteksi.`,
            });
        }

        const validatedFields = resetPasswordFormSchema.parse(values);

        if (!validatedFields) {
            return toast.error("Reset Password Gagal", {
                description: `Gagal validasi data.`,
            });
        }

        try {
            await axios.post('/forgot-password', { email: validatedFields.email.toLowerCase() });
            toast.success(`Link Reset Password berhasil dikirim ke email ${validatedFields.email}`);
            form.reset();
        } catch (err: AxiosError | any) {
            toast.error("Reset Password Gagal", {
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
        <>
            <Head title="Reset Password" />
            <div className="flex min-h-[90svh] flex-col items-center justify-center bg-background p-6 md:p-10">
                <div className="max-w-sm md:max-w- md:min-w-max mx-2">
                    <div className={"flex flex-col gap-6"}>
                        <h1 className="text-2xl font-bold text-center">Sistem Monitoring Magang</h1>
                        <Card className="overflow-hidden">
                            <CardContent>
                                <Form {...form}>
                                    <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                                        <div className="flex flex-col items-center text-center md:min-w-max">
                                            <h1 className="text-2xl font-bold">Forgot Password</h1>
                                            <p className="text-balance text-muted-foreground">
                                                Masukkan email Anda untuk mereset password.
                                            </p>
                                        </div>
                                        {/* Honeypot */}
                                        <input
                                            type="text"
                                            name="very-secret-honeypot"
                                            className="opacity-0 absolute -z-10"
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                        <div className="flex flex-col gap-4 mt-4">
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
                                            <div className="flex items-center justify-end">
                                                <Button disabled={loading} type="submit">
                                                    {loading ? <MoreHorizontalIcon className={loading ? "animate-pulse" : ""} /> : "Kirim"}
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
