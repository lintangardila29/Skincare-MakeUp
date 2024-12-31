import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

const testimonials = [
    { id: 1, name: "Sarah J.", quote: "These products have completely transformed my skin. I've never felt more confident!" },
    { id: 2, name: "Michael R.", quote: "As a makeup artist, I swear by these products. They're long-lasting and perfect for all skin types." },
    { id: 3, name: "Emily L.", quote: "I love how these products are not only effective but also environmentally conscious. A win-win!" },
]

export default function Testimonials() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-10 text-center">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id}>
                            <CardHeader>
                                <CardTitle>{testimonial.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="italic">"{testimonial.quote}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

