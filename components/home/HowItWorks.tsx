"use client"

import { motion } from "framer-motion"
import { Search, Filter, Rocket } from "lucide-react"

const steps = [
    {
        icon: Search,
        title: "Find Leads",
        description: "Our AI scans millions of data points to find your ideal customer profile in seconds.",
        color: "bg-blue-500"
    },
    {
        icon: Filter,
        title: "Qualify Automatically",
        description: "Every lead is scored based on your criteria. Only focus on high-intent prospects.",
        color: "bg-purple-500"
    },
    {
        icon: Rocket,
        title: "Convert & Close",
        description: "Push verified leads to your CRM and start your outreach sequences instantly.",
        color: "bg-emerald-500"
    }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-[#0b0f17]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        How Ideanix Works
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Turn cold data into hot leads in three simple steps.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 dark:bg-slate-800 -z-10"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className={`w-24 h-24 rounded-2xl bg-white dark:bg-[#1a202c] border border-slate-200 dark:border-slate-800 shadow-lg flex items-center justify-center mb-6 relative z-10 group-hover:scale-105 transition-transform duration-300`}>
                                <div className={`w-12 h-12 rounded-full ${step.color} bg-opacity-10 flex items-center justify-center`}>
                                    <step.icon className={`w-6 h-6 ${step.color.replace('bg-', 'text-')}`} />
                                </div>
                                <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
