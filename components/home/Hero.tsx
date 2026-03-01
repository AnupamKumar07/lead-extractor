"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-[#0b0f17]">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        New: AI-Powered Lead Scoring
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                        AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Lead Engine</span> for Modern Businesses
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
                        Find, qualify, and convert high-value leads automatically using Ideanix's intelligent lead generation platform. Stop chasing; start closing.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <Link href="/signup">
                            <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 w-full sm:w-auto">
                                Get Started Free
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full sm:w-auto hover:bg-slate-100 dark:hover:bg-slate-800">
                            <Play className="w-4 h-4 mr-2 text-slate-900 dark:text-white" />
                            Watch Demo
                        </Button>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>14-day free trial</span>
                        </div>
                    </div>
                </motion.div>

                {/* Visual Content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Main Dashboard Preview Mockup */}
                    <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a202c] shadow-2xl overflow-hidden aspect-[4/3] group perspective-1000">
                        <div className="absolute top-0 left-0 w-full h-8 bg-slate-50 dark:bg-[#151a23] border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        </div>

                        {/* Abstract UI Representation */}
                        <div className="p-6 mt-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="h-8 w-32 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-24 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20 p-4">
                                    <div className="h-4 w-12 bg-blue-200 dark:bg-blue-800 rounded mb-2"></div>
                                    <div className="h-8 w-16 bg-blue-300 dark:bg-blue-700 rounded"></div>
                                </div>
                                <div className="h-24 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 p-4"></div>
                                <div className="h-24 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 p-4"></div>
                            </div>
                            <div className="h-40 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
                                <svg className="absolute bottom-0 left-0 w-full h-24 stroke-blue-500" fill="none" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0 20 Q 25 5 50 10 T 100 0" strokeWidth="0.5" />
                                </svg>
                            </div>
                        </div>

                        {/* Floating Metric Card 1 */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute top-20 right-[-20px] bg-white dark:bg-[#252f3f] p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 w-48"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                    <span className="text-xs font-bold">JD</span>
                                </div>
                                <div>
                                    <div className="h-2 w-20 bg-slate-200 dark:bg-slate-600 rounded"></div>
                                    <div className="h-1.5 w-12 bg-slate-100 dark:bg-slate-700 rounded mt-1"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Match Score</span>
                                <span className="text-emerald-500 font-bold">98%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                                <div className="h-full w-[98%] bg-emerald-500"></div>
                            </div>
                        </motion.div>

                        {/* Floating Metric Card 2 */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="absolute bottom-10 left-[-20px] bg-white dark:bg-[#252f3f] p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 w-40"
                        >
                            <div className="text-xs text-slate-500 mb-1">New Leads Detected</div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">+128</span>
                                <span className="text-xs text-blue-500 font-medium">↑ 12%</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Background Decorative Blur */}
                    <div className="absolute inset-0 bg-blue-600/20 blur-3xl -z-10 rounded-full transform scale-90"></div>
                </motion.div>
            </div>
        </section>
    )
}
