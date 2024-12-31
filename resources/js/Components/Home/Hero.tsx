import { Button } from "@/Components/ui/button"

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-20">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center text-black">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Perfect Beauty Routine</h1>
                    <p className="text-xl mb-6">Expert-endorsed skincare and makeup products for your unique glow.</p>
                    <a href="#products"><Button size="lg" className="uppercase tracking-widest">Explore Products</Button></a>
                </div>
                <div className="md:w-1/2">
                    <img src="/hero.jpg" alt="Beauty Products" className="rounded-lg shadow-lg" />
                </div>
            </div>
        </section>
    )
}

