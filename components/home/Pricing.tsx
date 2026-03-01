"use client"

import { motion } from "framer-motion"
import { Check, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-white dark:bg-[#0b0f17]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Custom Pricing for Your Business
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        We offer flexible plans tailored to your specific lead generation needs. Contact us to get a personalized quote.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Value Proposition */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What's included in Enterprise?</h3>
                            <div className="space-y-4">
                                {[
                                    "Unlimited Lead Exports",
                                    "Custom AI Scoring Models",
                                    "Dedicated Success Manager",
                                    "API Access & Webhooks",
                                    "SSO & Advanced Security",
                                    "Priority 24/7 Support",
                                    "Custom CRM Integrations",
                                    "Team Training Sessions"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Details Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white dark:bg-[#151a23] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full -mr-10 -mt-10"></div>

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Get in Touch</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            Ready to scale? Our team is here to help you find the perfect plan.
                        </p>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-blue-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">Email Us</h4>
                                    <a href="mailto:sales@ideanix.com" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">sales@ideanix.com</a>
                                    <p className="text-xs text-slate-500 mt-1">We respond within 24 hours.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-blue-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">Call Us</h4>
                                    <a href="tel:+15551234567" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">+1 (555) 123-4567</a>
                                    <p className="text-xs text-slate-500 mt-1">Mon-Fri, 9am - 6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-blue-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">Office</h4>
                                    <p className="text-slate-600 dark:text-slate-400">100 Innovation Dr, Suite 500<br />San Francisco, CA 94103</p>
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                            Book a Demo <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
