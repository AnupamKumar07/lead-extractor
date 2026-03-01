"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { logoutMock } from "@/lib/auth"
import {
    Infinity,
    LayoutDashboard,
    Users,
    Bot,
    Settings2,
    Key,
    LogOut,
    BarChart2,
    Building2,
    Megaphone,
    Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboard } from "@/hooks/use-dashboard"
import { Button } from "@/components/ui/button"

const navItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Leads", href: "/leads", icon: Users },
    { title: "Companies", href: "/companies", icon: Building2 },
    { title: "Outreach", href: "/outreach", icon: Megaphone },
    { title: "Analytics", href: "/analytics", icon: BarChart2 },
]

const engineItems = [
    { title: "Intelligence Center", href: "/intelligence-center", icon: Zap },
    { title: "Scraper Command", href: "/scraper-command", icon: Bot },
    { title: "Sources Config", href: "/sources-config", icon: Settings2 },
    { title: "Proxy Manager", href: "/proxy-manager", icon: Key },
]

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { isSidebarOpen, closeSidebar } = useDashboard()

    const handleLogout = () => {
        logoutMock()
        router.push("/login")
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-[260px] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
                    "bg-gradient-to-b from-[#0f172a] to-[#020617] border-r border-white/5 shadow-2xl lg:shadow-none",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Header */}
                <div className="h-16 flex items-center px-6 border-b border-white/5 shrink-0">
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center transition-transform group-hover:scale-105">
                            <Infinity className="text-white w-5 h-5" />
                        </div>
                        <span className="font-semibold text-lg text-white tracking-tight">Ideanix</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">

                    {/* Main Section */}
                    <div>
                        <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                            Main
                        </p>
                        <div className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => closeSidebar()}
                                        className={cn(
                                            "relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group",
                                            isActive
                                                ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                                                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                        )}
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 rounded-r-max shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                                        )}
                                        <item.icon className={cn("w-[18px] h-[18px] transition-colors", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
                                        {item.title}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Engine Control Section */}
                    <div>
                        <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                            Engine Control
                        </p>
                        <div className="space-y-1">
                            {engineItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => closeSidebar()}
                                        className={cn(
                                            "relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group",
                                            isActive
                                                ? "bg-indigo-500/15 text-indigo-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-indigo-500/10"
                                                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                        )}
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-r-max shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
                                        )}
                                        <item.icon className={cn("w-[18px] h-[18px] transition-colors", isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")} />
                                        {item.title}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </nav>

                {/* Profile Footer */}
                <div className="p-4 shrink-0">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3 hover:bg-white/10 transition-colors shadow-sm relative overflow-hidden group/profile">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/profile:translate-x-full transition-transform duration-700 ease-in-out" />
                        <img
                            className="w-10 h-10 rounded-full bg-slate-800 object-cover ring-2 ring-white/10"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJJR8aPj1HzooglZkOqK98i59UD8GqZM7Zx_FGyBqJJe7-_zLhWiNXscquXqrcc6JCNnlIKU3oxvzzhfZqNbRRLO3zmjUNsyo_l4s8-gb5IGtLKilJlFxEkNVmA0T08r-dtSZrEiVFaYeXzCQJP10baqgktxEdtQaI6ggdskmoufV82lJ6SP-7V1YonQy_Zg5e04SqGmikV_PJLDlAw5xsdTUsZ91hUd3-bngsm3SOt16K1iFKTYdfsm1svBmZ7WQDZMUfm-xlESKv"
                            alt="User Profile"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-200 truncate group-hover/profile:text-white transition-colors">Alex Morgan</p>
                            <p className="text-[11px] text-slate-500 truncate">SaaS Founder</p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            size="icon"
                            className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl shrink-0 w-8 h-8 transition-colors"
                            title="Log out"
                        >
                            <LogOut className="w-[18px] h-[18px]" />
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    )
}
