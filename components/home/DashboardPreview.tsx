"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"

export function DashboardPreview() {
    return (
        <section className="py-24 bg-white dark:bg-[#0b0f17] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                            Control your entire pipeline from <span className="text-blue-600">one dashboard</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            No more juggling spreadsheets and multiple tools. Ideanix gives you a 360-degree view of your lead generation and sales performance.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                "Monitor real-time campaign performance",
                                "Track individual lead engagement scores",
                                "Visualize your conversion funnel",
                                "Manage team activities and tasks"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>

                        <a href="/dashboard" className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all group">
                            Explore the Dashboard <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>

                    {/* Right: Tilted Dashboard Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, rotateY: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative perspective-1000"
                    >
                        {/* Mock Dashboard UI - built with code to avoid external image dependency */}
                        <div className="relative rounded-xl bg-white dark:bg-[#151a23] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden aspect-video">
                            {/* Dashboard Header */}
                            <div className="h-12 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 bg-slate-50 dark:bg-[#1a202c]">
                                <div className="flex gap-2">
                                    <div className="h-2 w-2 rounded-full bg-red-400"></div>
                                    <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                </div>
                                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                            </div>

                            {/* Dashboard Content */}
                            <div className="p-6 grid grid-cols-4 gap-4 h-full bg-slate-50 dark:bg-[#0b0f17]">
                                {/* Sidebar */}
                                <div className="col-span-1 space-y-2">
                                    <div className="h-8 w-full bg-blue-100 dark:bg-blue-900/20 rounded-md"></div>
                                    <div className="h-8 w-full bg-white dark:bg-[#151a23] rounded-md"></div>
                                    <div className="h-8 w-full bg-white dark:bg-[#151a23] rounded-md"></div>
                                    <div className="h-8 w-full bg-white dark:bg-[#151a23] rounded-md"></div>
                                </div>
                                {/* Main Content */}
                                <div className="col-span-3 space-y-4">
                                    {/* Stats Row */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-20 bg-white dark:bg-[#151a23] rounded-lg shadow-sm"></div>
                                        <div className="h-20 bg-white dark:bg-[#151a23] rounded-lg shadow-sm"></div>
                                        <div className="h-20 bg-white dark:bg-[#151a23] rounded-lg shadow-sm"></div>
                                    </div>
                                    {/* Chart Area */}
                                    <div className="h-40 bg-white dark:bg-[#151a23] rounded-lg shadow-sm p-4 relative overflow-hidden">
                                        <div className="absolute bottom-4 left-4 right-4 h-24 flex items-end justify-between gap-1">
                                            {[40, 60, 45, 70, 50, 80, 65, 85].map((h, i) => (
                                                <div key={i} className="w-full bg-blue-500/20 hover:bg-blue-500 rounded-t-sm transition-colors" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Element */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute bottom-[-20px] left-[-20px] bg-white dark:bg-[#1f2937] p-4 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 w-56 backdrop-blur-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                                    <Check />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">Goal Reached!</div>
                                    <div className="text-xs text-slate-500">1,000 Leads generated</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
