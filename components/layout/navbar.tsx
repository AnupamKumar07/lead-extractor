"use client"

import Link from "next/link"
import { Menu, Search, Bell, Plus } from "lucide-react"
import { useDashboard } from "@/hooks/use-dashboard"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const { toggleSidebar } = useDashboard()

    return (
        <header className="h-16 bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-6 z-10 sticky top-0 transition-colors">
            {/* Left: Mobile Menu */}
            <div className="flex items-center gap-4 flex-1 md:flex-none">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-5 h-5" />
                </Button>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 justify-center max-w-2xl px-8">
                <div className="relative w-full group">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        <Search className="w-[18px] h-[18px]" />
                    </span>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-12 py-2 bg-slate-100/80 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-full text-sm placeholder-slate-500 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-[#0f172a] shadow-sm transition-all"
                        placeholder="Search leads, companies, or campaigns..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold border border-slate-200 dark:border-white/10 rounded px-1.5 py-0.5 bg-white dark:bg-transparent shadow-sm dark:shadow-none">⌘K</span>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4 flex-1 justify-end">
                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                    <Bell className="w-[18px] h-[18px]" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-[#020617]"></span>
                </Button>

                <div className="h-6 w-px bg-slate-200 dark:bg-white/10 hidden sm:block"></div>

                <Link href="/leads/new">
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 h-9 shadow-lg shadow-blue-600/20 transition-all font-medium hidden sm:flex items-center">
                        <Plus className="w-4 h-4" />
                        Add Lead
                    </Button>
                </Link>
            </div>
        </header>
    )
}
