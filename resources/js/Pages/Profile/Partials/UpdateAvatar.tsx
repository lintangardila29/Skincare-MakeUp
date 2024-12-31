import InputError from '@/Components/input-error'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { getImageSrc } from '@/Lib/getImageSrc'
import { User } from '@/types/model'
import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import { toast } from 'sonner'


export default function UpdateAvatar({ user }: { user: User }) {
    {/* @ts-expect-error idk how to fix this */ }
    const [avatar, setAvatar] = useState<File | undefined>(getImageSrc(user.avatar))
    const { data, setData, post, progress, errors, recentlySuccessful } = useForm({
        avatar: undefined,
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()
        post('/profile/avatar', { forceFormData: true })
    }

    if (recentlySuccessful) {
        toast.success('Profile picture updated.')
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        {/* @ts-expect-error idk how to fix this */ }
        setAvatar(URL.createObjectURL(e.target.files[0]))
        {/* @ts-expect-error idk how to fix this */ }
        setData('avatar', e.target.files[0])
    }

    return (
        <form onSubmit={submit}>
            <div className='flex items-center justify-center'>
                <Avatar className="h-44 w-44 my-2">
                    {/* @ts-expect-error idk how to fix this */}
                    <AvatarImage src={avatar ?? ""} alt={user.name ?? ""} />
                    <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex items-center justify-center gap-4'>
                {/* @ts-expect-error idk how to fix this */}
                <Input className='w-full md:max-w-max py-1.5' type="file" accept="image/*" value={data.avatar ? data.avatar.fileName : ""} onChange={e => handleAvatarChange(e)} />
                <InputError className="mt-2" message={errors.avatar} />
                <Button className='h-9' type="submit">Save</Button>
            </div>
        </form>
    )
}

