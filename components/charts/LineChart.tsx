"use client"

import { memo } from "react"
import { motion } from "framer-motion"

export const LineChart = memo(function LineChart() {
    return (
        <div className="relative w-full h-64 bg-slate-50 dark:bg-[#0d1117] rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-between py-6 px-4 pointer-events-none">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
                ))}
            </div>
            <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#3c83f6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#3c83f6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M0,80 Q10,75 20,60 T40,50 T60,40 T80,20 T100,10 V100 H0 Z"
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.path
                    d="M0,80 Q10,75 20,60 T40,50 T60,40 T80,20 T100,10"
                    fill="none"
                    stroke="#3c83f6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
            <div className="absolute bottom-2 left-4 text-xs text-slate-500">Jan</div>
            <div className="absolute bottom-2 right-4 text-xs text-slate-500">Dec</div>
        </div>
    )
})
