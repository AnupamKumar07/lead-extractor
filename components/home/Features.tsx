"use client"

import { motion } from "framer-motion"
import { Search, BarChart2, Users, MessageSquare, Database, ShieldCheck } from "lucide-react"

const features = [
    {
        icon: Search,
        title: "AI Lead Finder",
        description: "Automatically discover high-potential leads from LinkedIn, websites, and databases using advanced AI matching.",
        color: "bg-blue-500",
        delay: 0
    },
    {
        icon: BarChart2,
        title: "Smart Scoring",
        description: "Our AI analyzes 50+ data points to score every lead, prioritizing those most likely to convert.",
        color: "bg-purple-500",
        delay: 0.1
    },
    {
        icon: Users,
        title: "CRM Integration",
        description: "Seamlessly sync verified leads to HubSpot, Salesforce, or Pipedrive with a single click.",
        color: "bg-emerald-500",
        delay: 0.2
    },
    {
        icon: MessageSquare,
        title: "Automated Outreach",
        description: "Launch personalized email sequences and LinkedIn connection requests directly from the platform.",
        color: "bg-amber-500",
        delay: 0.3
    },
    {
        icon: Database,
        title: "Real-Time Enrichment",
        description: "Keep your contact data fresh. We automatically update emails, phone numbers, and job titles.",
        color: "bg-pink-500",
        delay: 0.4
    },
    {
        icon: ShieldCheck,
        title: "Enterprise Security",
        description: "SOC2 compliant platform with role-based access control and encrypted data storage.",
        color: "bg-cyan-500",
        delay: 0.5
    }
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-slate-50 dark:bg-[#0b0f17]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Everything you need to <span className="text-blue-600">scale your sales</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Powerful tools designed to help your team find, qualify, and close more deals with less effort.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: feature.delay }}
                            className="bg-white dark:bg-[#151a23] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
                        >
                            <div className={`w-12 h-12 rounded-lg ${feature.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`w-6 h-6 ${feature.color.replace('bg-', 'text-')}`} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
