"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();

    // Highlight active link if needed
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    SaaSBase
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                {pathname !== "/login" && (
                    <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                        Log in
                    </Link>
                )}
                {pathname !== "/signup" && (
                    <Link href="/signup" className="text-sm font-medium px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        Sign up
                    </Link>
                )}
            </div>
        </nav>
    );
}
