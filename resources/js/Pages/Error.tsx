import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { PageProps } from "@/types"
import { Link } from "@inertiajs/react"
import { AlertCircleIcon } from "lucide-react"

type ErrorPageProps = PageProps & {
    status: number
}

export default function ErrorPage({ status }: ErrorPageProps) {
    const title = {
        500: '500: Server Error',
        503: '503: Service Unavailable',
        403: '403: Forbidden',
        404: '404: Page Not Found',
        405: '405: Method Not Allowed',
    }[status]

    const description = {
        500: 'Whoops, something went wrong on our servers.',
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        403: 'Sorry, you are forbidden from accessing this page.',
        404: 'Sorry, the page you are looking for could not be found.',
        405: 'Sorry, the method is not allowed.',
    }[status]

    return (
        <div className="w-1/2 h-[90svh] flex flex-col place-self-center items-center justify-center gap-3 mx-6">
            <AlertCircleIcon size={48} className="text-red-500" />
            <p className='text-4xl font-bold'>{title ?? "Error"}</p>
            <Separator />
            <p className="text-lg font-medium mb-2">{description ?? "Anda tidak memiliki akses halaman ini."}</p>
            <Link href="/"><Button>Back to Home</Button></Link>
        </div>
    )
}
