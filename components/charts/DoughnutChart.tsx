"use client"

import { memo } from "react"
import { motion } from "framer-motion"

export const DoughnutChart = memo(function DoughnutChart() {
    return (
        <div className="flex flex-col items-center justify-center h-64">
            <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-48 h-48 rounded-full"
                style={{ background: 'conic-gradient(#3c83f6 0% 45%, #8B5CF6 45% 75%, #1F2937 75% 100%)' }}
            >
                <div className="absolute inset-0 m-auto w-32 h-32 bg-white dark:bg-card-dark rounded-full flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl font-bold text-slate-900 dark:text-white"
                    >
                        45%
                    </motion.span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">LinkedIn</span>
                </div>
            </motion.div>
            <div className="flex justify-center gap-4 mt-6 w-full">
                <LegendItem color="bg-primary" label="LinkedIn" delay={0.2} />
                <LegendItem color="bg-purple-500" label="Website" delay={0.3} />
                <LegendItem color="bg-slate-700" label="Email" delay={0.4} />
            </div>
        </div>
    )
})

function LegendItem({ color, label, delay }: { color: string, label: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="flex items-center gap-2"
        >
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
        </motion.div>
    )
}
