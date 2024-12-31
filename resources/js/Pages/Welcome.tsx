import FeaturedProducts from "@/Components/Home/FeaturedProducts"
import Footer from "@/Components/Home/Footer"
import Hero from "@/Components/Home/Hero"
import Testimonials from "@/Components/Home/Testimonials"
import { PageProps } from "@/types"
import { Product } from "@/types/model"
import { Head } from "@inertiajs/react"

export default function Welcome({ products }: PageProps & { products: Product[] }) {
    return (
        <>
            <Head title="Skin care and Make up" />
            <div className="min-h-screen flex flex-col">
                <main className="">
                    <Hero />
                    <FeaturedProducts products={products} />
                    <Testimonials />
                </main>
                <Footer />
            </div>
            {/* <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
                    <img
                        src="/hero.jpg"
                        alt="Background"
                        className="absolute inset-0 z-0 object-cover w-full h-full brightness-[0.2]"
                    />
                    <div className="container px-4 md:px-6 relative z-20">
                        <div className="flex flex-col items-center space-y-8 text-center">
                            <div className="space-y-4">
                                <img src="/favicon.ico" alt="Dinas" className="w-24 h-24 mx-auto" />
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                                    Skin care and Make up
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                                    Gabung dengan kami dan jadilah bagian dari <span className="font-extrabold text-white">Agent of Change</span> di masyarakat
                                </p>
                            </div>
                            <div className="space-x-4">
                                <div className="flex items-center justify-center">
                                    <div className="relative group">
                                        <Link href="/register" prefetch={["mount", "hover"]} className="flex items-center justify-center">
                                            <button
                                                className="relative inline-block p-px font-semibold leading-6 text-foreground bg-zinc-900/90 dark:bg-neutral-900 shadow-2xl cursor-pointer rounded-md shadow-blue-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-blue-600"
                                            >
                                                <span
                                                    className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                                ></span>
                                                <span className="relative z-10 block px-6 py-3 rounded-md bg-slate-200 shadow-inner dark:bg-neutral-950">
                                                    <div className="relative z-10 flex items-center space-x-2">
                                                        <span
                                                            className="transition-all duration-500 translate-x-4 group-hover:translate-x-1.5 group-hover:text-blue-400 dark:group-hover:text-blue-300"
                                                        >
                                                            Daftar Magang
                                                        </span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="opacity-0 w-7 h-7 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1.5 group-hover:text-blue-300"
                                                        >
                                                            <path
                                                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="relative w-full flex flex-col justify-between h-full pt-12 md:pt-24 lg:pt-32 bg-muted">
                    <div className="absolute w-full h-full infinity inset-0
                        bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC')]
                        dark:animate-bg-scrolling-reverse
                        dark:bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAZ0lEQVR4nO3ZsQ3AQAzDQBWewAE+Cxr47D9BZmDnggcNwF6596uqc949q6okmZlsMjPpfrJQmwWYRZhFmEWYRZhFmEWYRZhFmEWYRZhFmEWYRZhFmEWYRZhFmEWYRZhFmEWYBS38E39OaxxlYXQ0ggAAAABJRU5ErkJggg==')] "></div>
                    <div className="relative container h-full px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                            <Card className="hover:cursor-pointer shadow-lg hover:shadow-two hover:shadow-blue-500/50 hover:scale-105 transform transition-all duration-500 ease-in-out">
                                <CardHeader>
                                    <GraduationCap className="h-8 w-8 mb-2" />
                                    <CardTitle>Pengembangan Karir</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Dapatkan pengalaman kerja yang berharga dan berkontribusi pada masyarakat.</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:cursor-pointer shadow-lg hover:shadow-two hover:shadow-blue-500/50 hover:scale-105 transform transition-all duration-500 ease-in-out">
                                <CardHeader>
                                    <Users className="h-8 w-8 mb-2" />
                                    <CardTitle>Membangun Relasi</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Bekerja dengan para profesional yang berpengalaman dan berbakat.</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:cursor-pointer shadow-lg hover:shadow-two hover:shadow-blue-500/50 hover:scale-105 transform transition-all duration-500 ease-in-out">
                                <CardHeader>
                                    <Building2 className="h-8 w-8 mb-2" />
                                    <CardTitle>Proyek Transformasional</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Ikuti proyek-proyek inovatif yang akan membawa perubahan positif.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="relative z-50 container px-4 md:px-6 py-12 md:py-24 lg:py-32 my-10">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center text-foreground">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Tentang Kami</h2>
                                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-300 md:text-xl">
                                    Dinas Komunikasi dan Digital Kabupaten Pekalongan bertugas untuk mengelola informasi dan teknologi di lingkungan pemerintahan.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <Button asChild>
                                    <a href="https://dinkominfo.pekalongankab.go.id" target="_blank" className="uppercase tracking-widest">
                                        Pelajari Lebih Lanjut
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="place-self-end py-6 relative flex flex-col gap-2 sm:flex-row w-full shrink-0 items-center px-4 md:px-6 bg-transparent">
                        <p className="text-xs text-muted-foreground">© 2025 Dinas Komunikasi dan Digital Kabupaten Pekalongan. All rights reserved.</p>
                        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                            <Button variant="link" className="h-5 px-0">
                                <a className="flex items-center justify-center text-xs hover:underline underline-offset-4" href="mailto:dinkomdigi@pekalongankab.go.id">
                                    <MailIcon className="h-4 w-4 mr-2" /> dinkominfo@pekalongankab.go.id
                                </a>
                            </Button>
                            <Button variant="link" className="h-5 px-0">
                                <a className="flex items-center justify-center text-xs hover:underline underline-offset-4" href="https://www.instagram.com/dinkominfopekalongankab/" target="_blank">
                                    <InstagramIcon className="h-4 w-4 mr-2" /> @dinkominfopekalongankab
                                </a>
                            </Button>
                        </nav>
                    </div>
                </section>
            </main> */}
        </>
    )
}

