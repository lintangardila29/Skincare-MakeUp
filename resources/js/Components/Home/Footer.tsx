export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">BeautyBoost</h3>
                        <p>Empowering your beauty journey with expert-endorsed products.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <ul className="gap-6 flex flex-row">
                            <li><a href="#" className="hover:text-primary">Facebook</a></li>
                            <li><a href="#" className="hover:text-primary">Instagram</a></li>
                            <li><a href="#" className="hover:text-primary">Twitter</a></li>
                            <li><a href="#" className="hover:text-primary">YouTube</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p>&copy; {new Date().getFullYear()} BeautyBoost. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

