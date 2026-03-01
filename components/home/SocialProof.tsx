"use client"

import { motion } from "framer-motion"

const companies = [
    { name: "Acme Corp", logo: "https://via.placeholder.com/100x40?text=Acme" },
    { name: "Globex", logo: "https://via.placeholder.com/100x40?text=Globex" },
    { name: "Soylent", logo: "https://via.placeholder.com/100x40?text=Soylent" },
    { name: "Initech", logo: "https://via.placeholder.com/100x40?text=Initech" },
    { name: "Umbrella", logo: "https://via.placeholder.com/100x40?text=Umbrella" },
    { name: "Stark", logo: "https://via.placeholder.com/100x40?text=Stark" },
]

export function SocialProof() {
    return (
        <section className="py-10 bg-white dark:bg-[#0b0f17] border-y border-slate-100 dark:border-slate-800/50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 uppercase tracking-wider">
                    Trusted by forward-thinking teams at
                </p>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Using simple text placeholders for logos to ensure no broken images, styled to look like logos */}
                    {['Acme Inc', 'GlobalTech', 'Nebula', 'FoxRun', 'CircleAI', 'Treeline'].map((company, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-xl md:text-2xl font-bold font-mono text-slate-300 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 cursor-default select-none"
                        >
                            {company}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
