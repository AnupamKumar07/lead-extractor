"use client"

import { useState } from "react"
import { Search, Filter, ShieldCheck, Database, Zap, AlertCircle, ArrowRight, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function PremiumIntelligenceDashboard() {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [mode, setMode] = useState<"Lead" | "Company" | "Trend" | "Founder" | null>(null);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Header / War Room Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Intelligence Engine</h1>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Enterprise-grade data extraction, enrichment, and AI scoring pipeline.
                    </p>
                </div>

                {/* Global Status Indicators */}
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Duplicate Prevention Active
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                        <Database className="w-3 h-3 mr-1" />
                        API Quota: 85% Free
                    </Badge>
                </div>
            </div>

            {/* Step Wizard UI */}
            <div className="relative border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 flex justify-between">
                {['Select Mode', 'Define Filters', 'Extract & Enrich', 'Review & Import'].map((label, index) => {
                    const s = index + 1;
                    const isActive = step === s;
                    const isCompleted = step > s;
                    return (
                        <div key={s} className={`flex flex-col items-center gap-2 ${isActive ? 'opacity-100' : isCompleted ? 'opacity-60' : 'opacity-30'} transition-opacity`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${isActive ? 'border-primary text-primary bg-primary/10' : isCompleted ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : 'border-slate-300 text-slate-400'}`}>
                                {isCompleted ? <CheckCircle className="w-4 h-4" /> : s}
                            </div>
                            <span className="text-xs font-medium dark:text-slate-300">{label}</span>
                        </div>
                    )
                })}
            </div>

            <div className="min-h-[400px]">
                {/* Step 1: Mode Selection */}
                {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-bottom-4 duration-500">
                        {[
                            { id: "Lead", title: "Lead Extraction", desc: "Find decision makers & enrich profiles natively.", icon: Search },
                            { id: "Company", title: "Company Research", desc: "Deep-dive into funding, size, and structure.", icon: Database },
                            { id: "Trend", title: "Trend Intelligence", desc: "Track hiring spikes and news mentions.", icon: Zap },
                            { id: "Founder", title: "Founder Validation", desc: "Verify ownership and social presence.", icon: ShieldCheck }
                        ].map(m => (
                            <Card
                                key={m.id}
                                className={`p-6 cursor-pointer border-2 transition-all hover:-translate-y-1 ${mode === m.id ? 'border-primary ring-4 ring-primary/10 bg-primary/5' : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 bg-white dark:bg-card-dark'}`}
                                onClick={() => setMode(m.id as any)}
                            >
                                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-600 dark:text-slate-300">
                                    <m.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{m.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{m.desc}</p>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Step 2: Filters */}
                {step === 2 && (
                    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-bold dark:text-white">Define Target Filters</h2>
                            <p className="text-slate-500">Narrow down your {mode?.toLowerCase()} extraction parameters.</p>
                        </div>
                        <Card className="p-6 space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Industry</label>
                                <Input placeholder="e.g. Software, Healthcare..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Company Size</label>
                                    <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                        <option>Any Size</option>
                                        <option>1-10 (Seed)</option>
                                        <option>11-50 (Early)</option>
                                        <option>51-200 (Growth)</option>
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <Input placeholder="e.g. San Francisco..." />
                                </div>
                            </div>
                            <div className="grid gap-2 pt-2">
                                <label className="text-sm font-medium">Keywords</label>
                                <Input placeholder="e.g. 'AI', 'Machine Learning', 'SaaS'" />
                            </div>
                        </Card>
                    </div>
                )}

                {/* Step 3: Extraction Simulator */}
                {step === 3 && (
                    <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in fade-in duration-500">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/20 animate-pulse"></div>
                            <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 shadow-xl flex items-center justify-center relative z-10">
                                <Search className="w-10 h-10 text-primary animate-bounce" />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <h2 className="text-xl font-bold dark:text-white">Extraction Engine Running...</h2>
                            <p className="text-slate-500 max-w-sm">Scraping endpoints, inferring missing data, and cross-referencing global schemas.</p>
                        </div>

                        <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden mt-4">
                            <div className="bg-primary h-full w-2/3 animate-pulse rounded-full"></div>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">Found: 142 records | Deduped: 12</p>
                    </div>
                )}

                {/* Step 4: Premium Review Table */}
                {step === 4 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 duration-500">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold dark:text-white">Pre-Import Intelligence Review</h2>
                            <Button variant="outline" size="sm">Select All</Button>
                        </div>

                        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th className="p-4 font-medium text-slate-500">Target</th>
                                        <th className="p-4 font-medium text-slate-500">Confidence</th>
                                        <th className="p-4 font-medium text-slate-500">Duplicate Risk</th>
                                        <th className="p-4 font-medium text-slate-500">AI Intent</th>
                                        <th className="p-4 font-medium text-slate-500 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {[
                                        { name: "John Doe", comp: "Acme AI", conf: 95, dup: "Low", tags: ["Decision Maker"] },
                                        { name: "Alex Smith", comp: "Techflow", conf: 60, dup: "High (Email Match)", tags: ["Engineer"] },
                                        { name: "Sarah Lee", comp: "Global Solutions", conf: 85, dup: "Low", tags: ["Venture Funded", "VP"] }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                                            <td className="p-4">
                                                <p className="font-medium text-slate-900 dark:text-white">{row.name}</p>
                                                <p className="text-xs text-slate-500">{row.comp}</p>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className={`h-full ${row.conf > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${row.conf}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-mono">{row.conf}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="outline" className={row.dup.includes("High") ? "text-red-500 border-red-200 bg-red-50" : "text-emerald-500 border-emerald-200 bg-emerald-50"}>
                                                    {row.dup}
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-1 flex-wrap">
                                                    {row.tags.map(t => (
                                                        <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="sm" className="text-red-500">Discard</Button>
                                                    <Button size="sm" className={row.dup.includes("High") ? "bg-amber-500 hover:bg-amber-600" : "bg-primary"}>
                                                        {row.dup.includes("High") ? "Merge" : "Import"}
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                )}
            </div>

            {/* Navigation Bar Bottom */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800">
                <Button
                    variant="ghost"
                    disabled={step === 1}
                    onClick={() => setStep(step - 1 as any)}
                >
                    Back
                </Button>

                <Button
                    disabled={step === 1 && !mode}
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => {
                        if (step < 4) setStep(step + 1 as any)
                    }}
                >
                    {step === 1 ? 'Continue to Filters' : step === 3 ? 'Run Engine' : 'Next Step'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>

        </div>
    )
}
