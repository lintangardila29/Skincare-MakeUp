import { Button } from '@/Components/ui/button';
import InputError from '@/Components/input-error';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-foreground">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Setelah akun Anda dihapus, semua data dan informasi akan dihapus secara permanen.
                    Sebelum menghapus akun Anda, harap unduh data atau informasi apa pun yang ingin Anda simpan.
                </p>
            </header>

            <Dialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
                <DialogTrigger className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 uppercase tracking-widest h-9 px-4 rounded-md'>
                    Delete Account
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Apakah Anda yakin?</DialogTitle>
                        <DialogDescription>
                            Aksi ini tidak dapat dibatalkan. Setelah akun Anda dihapus, semua data dan informasi akan dihapus secara permanen.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={deleteUser}>
                        <div className="mt-2">
                            <Label
                                htmlFor="password"
                                className="sr-only"
                            >
                                Password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="mt-1 block w-full"
                                placeholder="Password"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button variant="secondary" type="button" className="uppercase tracking-widest" onClick={closeModal}>
                                Batal
                            </Button>

                            <Button variant="destructive" className="ms-3 uppercase tracking-widest" disabled={processing}>
                                Delete Account
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
