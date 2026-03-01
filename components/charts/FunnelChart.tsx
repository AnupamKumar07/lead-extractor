"use client"

import { memo } from "react"
import { motion } from "framer-motion"

interface FunnelChartProps {
    data: { name: string, value: number, fill: string }[]
}

export const FunnelChart = memo(function FunnelChart({ data }: FunnelChartProps) {
    const maxValue = Math.max(...data.map(d => d.value), 1)

    return (
        <div className="flex flex-col gap-4 justify-center h-full">
            {data.map((step, index) => (
                <div key={step.name} className="relative">
                    <div className={`flex justify-between text-xs mb-1 font-medium ${index === data.length - 1 ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        <span className={index === data.length - 1 ? 'text-primary font-bold' : ''}>{step.name}</span>
                        <span className={index === data.length - 1 ? 'text-primary font-bold' : ''}>{step.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(step.value / maxValue) * 100}%` }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: step.fill }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
})
