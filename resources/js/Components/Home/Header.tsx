import { Button } from "@/Components/ui/button"

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-primary">BeautyBoost</a>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="text-gray-600 hover:text-primary">Skincare</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-primary">Makeup</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-primary">About</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-primary">Contact</a></li>
                    </ul>
                </nav>
                <Button>Sign Up</Button>
            </div>
        </header>
    )
}

