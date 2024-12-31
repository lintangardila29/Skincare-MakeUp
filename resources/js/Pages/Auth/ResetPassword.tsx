import InputError from '@/Components/input-error';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { MoreHorizontalIcon } from 'lucide-react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const [loading, setLoading] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        setLoading(true);
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
        setLoading(false)
    };

    return (
        <>
            <Head title="Reset Password" />

            <div className="flex min-h-[90svh] flex-col items-center justify-center bg-background p-6 md:p-10">
                <div className="max-w-sm md:max-w-md md:min-w-max mx-2">
                    <div className={"flex flex-col gap-6"}>
                        <h1 className="text-2xl font-bold text-center">Sistem Monitoring Magang</h1>
                        <Card className="overflow-hidden">
                            <CardContent>
                                <form onSubmit={submit} className="p-6 md:p-8">
                                    <div className="flex flex-col items-center text-center md:min-w-max">
                                        <h1 className="text-2xl font-bold">Reset Password</h1>
                                        <p className="text-balance text-muted-foreground">
                                            Isi formulir di bawah ini untuk mereset password Anda.
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="email">Email</Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            disabled={loading}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />

                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="password">Password</Label>

                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            disabled={loading}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />

                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <Label
                                            htmlFor="password_confirmation"
                                        >
                                            Confirm Password
                                        </Label>

                                        <Input
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            disabled={loading}
                                            onChange={(e) =>
                                                setData('password_confirmation', e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.password_confirmation}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4 flex items-center justify-end">
                                        <Button className="" disabled={processing}>
                                            {loading ? <MoreHorizontalIcon className={loading ? "animate-pulse" : ""} /> : "Kirim"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

        </>
    );
}
