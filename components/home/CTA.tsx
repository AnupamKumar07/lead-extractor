"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 opacity-90"></div>

            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                    Ready to supercharge your <br /> lead generation?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Join thousands of sales teams finding their next big customer with Ideanix. Start your free 14-day trial today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <Button size="lg" className="h-14 px-8 text-lg bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-xl">
                        Get Started for Free
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-blue-400 text-white hover:bg-white/10 hover:text-white bg-transparent">
                        Book a Demo
                    </Button>
                </motion.div>

                <p className="mt-8 text-sm text-blue-200 opacity-80">
                    No credit card required · Cancel anytime · 24/7 Support
                </p>
            </div>
        </section>
    )
}
