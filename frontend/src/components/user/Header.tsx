import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { LuMountain } from "react-icons/lu";
import Example from './Example';

const Header = () => {
    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-muted/40 shadow-sm bg-white">
                <div className="container flex h-14 items-center justify-between px-4 md:px-6">
                    <Link to="#" className="flex items-center gap-2">
                        <LuMountain className="h-6 w-6" />
                        <span className="text-lg font-semibold">Acme Store</span>
                    </Link>
                    <div className="relative flex-1 max-w-md md:mx-6">
                        <div className="absolute inset-y-0 left-2 flex items-center pl-2">
                            <FiSearch className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <input
                            type="search"
                            placeholder="Search products..."
                            className="h-9 w-full rounded-md border border-input bg-background pl-9 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="rounded-full">
                            <FiShoppingCart className="h-6 w-6" />
                            <span className="sr-only">Cart</span>
                            {/* <Example /> */}
                        </button>
                        <button className="rounded-full">
                            <FiUser className="h-6 w-6" />
                            <span className="sr-only">Login</span>
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header