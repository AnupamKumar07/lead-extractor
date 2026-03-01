"use client"

import { useEffect } from "react"
import {
    TrendingUp,
    TrendingDown,
    Users,
    CheckCircle,
    Gem,
    MessageSquare,
    PieChart,
    MoreVertical,
    RefreshCw,
    Sparkles,
    Link as LinkIcon,
    Mail,
    Check
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAnalyticsStore } from "@/store/useAnalyticsStore"
import { DashboardSkeleton } from "@/components/ui/skeletons"
import { LineChart } from "@/components/charts/LineChart"
import { DoughnutChart } from "@/components/charts/DoughnutChart"
import { RecentLeads } from "@/components/dashboard/RecentLeads"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
    const { stats, fetchAnalytics, isLoading } = useAnalyticsStore()

    useEffect(() => {
        fetchAnalytics()
    }, [fetchAnalytics])

    if (isLoading || !stats) {
        return <DashboardSkeleton />
    }

    return (
        <div className="animate-in fade-in duration-700 ease-out space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[28px] font-bold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">Real-time intelligence and campaign telemetry.</p>
                </div>
                <div className="flex items-center gap-1.5 bg-white dark:bg-[#0f172a]/50 backdrop-blur-md rounded-xl p-1.5 border border-slate-200 dark:border-white/5 shadow-sm">
                    <Button variant="default" size="sm" className="h-[34px] px-4 font-semibold text-xs rounded-lg shadow-sm bg-blue-600 hover:bg-blue-700">Last 7 Days</Button>
                    <Button variant="ghost" size="sm" className="h-[34px] px-4 font-medium text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg">Last 30 Days</Button>
                    <Button variant="ghost" size="sm" className="h-[34px] px-4 font-medium text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg">Month</Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                <MetricCard
                    title="Total Leads"
                    value={stats.metrics.totalLeads.value.toLocaleString()}
                    trend={stats.metrics.totalLeads.trend}
                    trendUp={stats.metrics.totalLeads.trendUp}
                    icon={Users}
                    color="blue"
                />
                <MetricCard
                    title="Qualified Leads"
                    value={stats.metrics.qualifiedLeads.value.toLocaleString()}
                    trend={stats.metrics.qualifiedLeads.trend}
                    trendUp={stats.metrics.qualifiedLeads.trendUp}
                    icon={CheckCircle}
                    color="emerald"
                />
                <MetricCard
                    title="High-Value"
                    value={stats.metrics.highValueLeads.value.toLocaleString()}
                    trend={stats.metrics.highValueLeads.trend}
                    trendUp={stats.metrics.highValueLeads.trendUp}
                    icon={Gem}
                    color="indigo"
                    highlight
                />
                <MetricCard
                    title="Contacted"
                    value={stats.metrics.contactedLeads.value.toLocaleString()}
                    trend={stats.metrics.contactedLeads.trend}
                    trendUp={stats.metrics.contactedLeads.trendUp}
                    icon={MessageSquare}
                    color="blue"
                />
                <MetricCard
                    title="Conv. Rate"
                    value={stats.metrics.conversionRate.value}
                    trend={stats.metrics.conversionRate.trend}
                    trendUp={stats.metrics.conversionRate.trendUp}
                    icon={PieChart}
                    color="blue"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-7 lg:col-span-2 overflow-hidden relative group bg-white dark:bg-[#0f172a]/60 backdrop-blur-2xl border-slate-200 dark:border-white/5 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-[17px] font-bold text-slate-900 dark:text-white tracking-tight">Leads Generated Over Time</h3>
                            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Monthly acquisition velocity mapped against pipeline goals.</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </div>
                    <LineChart />
                </Card>

                <Card className="p-7 bg-white dark:bg-[#0f172a]/60 backdrop-blur-2xl border-slate-200 dark:border-white/5 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="mb-8">
                        <h3 className="text-[17px] font-bold text-slate-900 dark:text-white tracking-tight">Acquisition Channels</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Lead volume divided by primary sources.</p>
                    </div>
                    <DoughnutChart />
                </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Leads Table */}
                <Card className="lg:col-span-2 overflow-hidden flex flex-col p-0 border-slate-200 dark:border-white/5 shadow-sm rounded-[24px] bg-white dark:bg-[#0f172a]/60 backdrop-blur-2xl hover:shadow-xl transition-all duration-300">
                    <div className="p-7 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div>
                            <h3 className="text-[17px] font-bold text-slate-900 dark:text-white tracking-tight">Recent Database Entries</h3>
                            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Latest targets ingested via the Intelligence Center.</p>
                        </div>
                        <Link href="/leads">
                            <Button variant="outline" size="sm" className="h-9 font-medium text-[13px] rounded-xl dark:border-white/10 dark:hover:bg-white/5">
                                View Full Directory
                            </Button>
                        </Link>
                    </div>
                    <RecentLeads leads={stats.recentLeads} />
                </Card>

                {/* Activity Feed */}
                <Card className="p-7 flex flex-col h-full bg-white dark:bg-[#0f172a]/60 backdrop-blur-2xl border-slate-200 dark:border-white/5 shadow-sm rounded-[24px] hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-[17px] font-bold text-slate-900 dark:text-white tracking-tight">Execution Feed</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 rounded-full transition-colors">
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="space-y-6 relative flex-1 overflow-y-auto pr-2 scrollbar-hide">
                        <div className="absolute left-[11px] top-3 bottom-2 w-px bg-slate-200 dark:bg-slate-800"></div>

                        {stats.activityFeed?.map((item: any) => {
                            let Icon = Sparkles
                            if (item.type === 'scraped') Icon = LinkIcon
                            if (item.type === 'email_opened') Icon = Mail
                            if (item.type === 'task_completed') Icon = Check

                            return (
                                <FeedItem
                                    key={item.id}
                                    icon={Icon}
                                    iconColor={item.iconColor}
                                    title={item.title}
                                    desc={item.description}
                                    time={item.time}
                                />
                            )
                        })}
                    </div>
                </Card>
            </div>
        </div>
    )
}

function MetricCard({ title, value, trend, trendUp, icon: Icon, color, highlight }: any) {
    const neutral = trendUp === 'neutral' || trendUp === undefined;

    // Sophisticated background & text mappings
    const colorMap: any = {
        blue: { bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
        emerald: { bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
        indigo: { bg: "bg-indigo-50 dark:bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400" },
    }

    const theme = colorMap[color] || colorMap.blue

    return (
        <div className={cn(
            "bg-white dark:bg-[#0f172a]/80 backdrop-blur-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group rounded-[20px]",
            highlight && "ring-1 ring-indigo-500/30 dark:ring-indigo-500/30 bg-gradient-to-br from-white to-indigo-50/50 dark:from-[#0f172a]/90 dark:to-indigo-950/20"
        )}>
            {highlight && (
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
            )}

            <div className="flex justify-between items-start mb-5 relative z-10">
                <div className={`p-2.5 rounded-xl ${theme.bg}`}>
                    <Icon className={`w-5 h-5 ${theme.text}`} />
                </div>
                <span className={cn(
                    "text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm",
                    neutral
                        ? 'text-slate-600 bg-slate-100/80 dark:bg-slate-800 dark:text-slate-400'
                        : trendUp
                            ? 'text-emerald-700 bg-emerald-100/80 dark:text-emerald-400 dark:bg-emerald-500/10 border border-emerald-500/10'
                            : 'text-red-700 bg-red-100/80 dark:text-red-400 dark:bg-red-500/10 border border-red-500/10'
                )}>
                    {neutral ? <div className="w-1.5 h-0.5 bg-current rounded-full" /> : trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {trend}
                </span>
            </div>

            <div className="relative z-10">
                <h3 className="text-slate-500 dark:text-slate-400 text-[12px] font-bold uppercase tracking-wider">{title}</h3>
                <p className="text-[26px] font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">{value}</p>
            </div>
        </div>
    )
}

function FeedItem({ icon: Icon, iconColor, title, desc, time }: any) {
    return (
        <div className="relative flex gap-4 group cursor-pointer">
            <div className={cn(
                "relative z-10 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-[#0f172a] shadow-sm transition-transform group-hover:scale-110 duration-200 shrink-0",
                iconColor || "bg-blue-500" // Fallback to blue
            )}>
                <Icon className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1 pb-1">
                <div className="flex justify-between items-baseline">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{title}</p>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{time}</span>
                </div>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
