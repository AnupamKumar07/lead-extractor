"use client"

import { Badge } from "@/components/ui/badge"
import { Flame, Activity, Zap, ShieldCheck, AlertTriangle } from "lucide-react"

interface SmartTagProps {
    type: "intent" | "engagement" | "risk" | "enrichment" | "founder"
    value: string
}

export function SmartTag({ type, value }: SmartTagProps) {
    if (type === "intent") {
        return (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                <Flame className="w-3 h-3 mr-1" />
                {value}
            </Badge>
        )
    }

    if (type === "engagement") {
        const isHot = value.toLowerCase().includes("warm") || value.toLowerCase().includes("hot")
        return (
            <Badge variant="secondary" className={isHot ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800"}>
                <Activity className="w-3 h-3 mr-1" />
                {value}
            </Badge>
        )
    }

    if (type === "founder") {
        return (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                <ShieldCheck className="w-3 h-3 mr-1" />
                {value}
            </Badge>
        )
    }

    if (type === "risk") {
        const isHigh = value.toLowerCase().includes("high")
        return (
            <Badge variant="secondary" className={isHigh ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-800"}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {value}
            </Badge>
        )
    }

    // Default Enrichment Tag
    return (
        <Badge variant="outline" className="text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800">
            <Zap className="w-3 h-3 mr-1" />
            {value}
        </Badge>
    )
}

export function SmartTagList({ tags, type = "enrichment" }: { tags: string[] | null, type?: SmartTagProps["type"] }) {
    if (!tags || tags.length === 0) return null

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
                <SmartTag key={idx} type={type} value={tag} />
            ))}
        </div>
    )
}
