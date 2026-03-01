"use client"

import { memo } from "react"
import { motion } from "framer-motion"

interface BarChartProps {
    data: { name: string, value: number, fill: string }[]
    height?: number
}

export const BarChart = memo(function BarChart({ data, height = 256 }: BarChartProps) {
    const maxValue = Math.max(...data.map(d => d.value), 1)

    return (
        <div className="relative w-full flex items-end justify-between gap-4 px-2" style={{ height }}>
            {/* Background Grid */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-slate-200 dark:border-slate-800 w-full h-0"></div>
                <div className="border-b border-slate-200 dark:border-slate-800 border-dashed w-full h-0 opacity-50"></div>
                <div className="border-b border-slate-200 dark:border-slate-800 border-dashed w-full h-0 opacity-50"></div>
                <div className="border-b border-slate-200 dark:border-slate-800 border-dashed w-full h-0 opacity-50"></div>
                <div className="border-b border-slate-200 dark:border-slate-800 w-full h-0"></div>
            </div>

            {data.map((item, index) => (
                <div key={item.name} className="relative flex-1 flex flex-col justify-end items-center group h-full z-10">
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: `${(item.value / maxValue) * 85}%`, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                        className={`w-full max-w-[40px] rounded-t-sm relative hover:opacity-90 transition-opacity`}
                        style={{ backgroundColor: item.fill }}
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                            {item.value.toLocaleString()} Leads
                        </div>
                    </motion.div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">{item.name}</span>
                </div>
            ))}
        </div>
    )
})
