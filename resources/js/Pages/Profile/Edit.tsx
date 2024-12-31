import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
// import { ScrollArea } from '@/Components/ui/scroll-area';
import { Card, CardContent } from '@/Components/ui/card';
import { Product, Category } from '@/types/model';

export interface InternFormProps {
    products: Product[]
    categories: Category[]
}

export default function Edit({
    mustVerifyEmail,
    status,
    auth,
    internFormProps,
}: PageProps<{ mustVerifyEmail: boolean; status?: string, internFormProps: InternFormProps }>) {
    return (
        <>
            <Head title="Profile" />
            {/* <ScrollArea className="h-full"> */}
            <div className="mx-8 py-8">
                <div className="w-full space-y-6">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className='pt-6'>
                            <CardContent>
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </CardContent>
                        </Card>

                        <Card className='pt-6'>
                            <CardContent><UpdatePasswordForm className="max-w-xl" /></CardContent>
                        </Card>
                    </div>

                    <Card className='pt-6'>
                        <CardContent><DeleteUserForm className="max-w-xl" /></CardContent>
                    </Card>
                </div>
            </div>
            {/* </ScrollArea> */}
        </>
    );
}
