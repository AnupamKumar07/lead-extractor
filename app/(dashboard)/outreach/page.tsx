"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Phone } from "lucide-react"

export default function OutreachPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Outreach Campaigns</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your email and LinkedIn campaigns.</p>
                </div>
                <Button>New Campaign</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-white dark:bg-card-dark border-t-4 border-t-blue-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Email Sequences</h3>
                            <p className="text-xs text-slate-500">Cold outreach automation</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Active</span>
                            <span className="font-medium text-slate-900 dark:text-white">3</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Sent</span>
                            <span className="font-medium text-slate-900 dark:text-white">1,240</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Open Rate</span>
                            <span className="font-medium text-emerald-500">42%</span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-white dark:bg-card-dark border-t-4 border-t-blue-700">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">LinkedIn Outreach</h3>
                            <p className="text-xs text-slate-500">Connection & Messaging</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Active</span>
                            <span className="font-medium text-slate-900 dark:text-white">1</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Connected</span>
                            <span className="font-medium text-slate-900 dark:text-white">340</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Reply Rate</span>
                            <span className="font-medium text-emerald-500">18%</span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-white dark:bg-card-dark border-t-4 border-t-purple-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-500">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Call List</h3>
                            <p className="text-xs text-slate-500">Manual dialing queue</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Pending</span>
                            <span className="font-medium text-slate-900 dark:text-white">45</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Completed</span>
                            <span className="font-medium text-slate-900 dark:text-white">12</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Booked</span>
                            <span className="font-medium text-emerald-500">4</span>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="p-12 text-center bg-slate-50 dark:bg-slate-900/50 border-dashed">
                <p className="text-slate-500">Select a campaign type to view detailed analytics and manage sequences.</p>
            </Card>
        </div>
    )
}
