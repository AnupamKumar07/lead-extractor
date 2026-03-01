"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User, Shield, Key, Bell, CreditCard } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Workspace Settings</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your team, billing, and system preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                {/* Navigation Sidebar */}
                <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start gap-3 bg-white/5 dark:bg-white/5 text-slate-900 dark:text-white pointer-events-none">
                        <User className="w-4 h-4" /> Account
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                        <Shield className="w-4 h-4" /> Team & Roles
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                        <Key className="w-4 h-4" /> API Keys
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                        <Bell className="w-4 h-4" /> Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                        <CreditCard className="w-4 h-4" /> Billing
                    </Button>
                </nav>

                {/* Content Area */}
                <div className="space-y-6">
                    <Card className="p-6 bg-white dark:bg-[#0f172a]/60 backdrop-blur-xl border-slate-200 dark:border-white/5 shadow-sm rounded-2xl">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your personal details and avatar.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                                <Input defaultValue="Alex Morgan" className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10" />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Format</label>
                                <Input defaultValue="alex@ideanix.com" disabled className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-500" />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
                                <Input defaultValue="ADMIN (Owner)" disabled className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-500" />
                            </div>
                            <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20">Save Changes</Button>
                        </div>
                    </Card>

                    <Card className="p-6 bg-white dark:bg-[#0f172a]/60 backdrop-blur-xl border-slate-200 dark:border-white/5 shadow-sm rounded-2xl border-red-500/20 dark:border-red-500/20">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-red-600 dark:text-red-400">Danger Zone</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Irreversible and destructive actions.</p>
                        </div>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">Delete Workspace</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
