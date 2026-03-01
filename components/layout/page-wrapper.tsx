"use client"

import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"

interface PageWrapperProps {
    children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 font-sans selection:bg-blue-500/30">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <Navbar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto pb-12">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
