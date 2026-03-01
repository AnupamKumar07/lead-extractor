"use client"

import { useEffect } from "react"
import {
    Users,
    ArrowUp,
    ShieldCheck,
    TrendingUp,
    ArrowDown,
    DollarSign,
    ArrowRight
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAnalyticsStore } from "@/store/useAnalyticsStore"
import { AnalyticsSkeleton } from "@/components/ui/skeletons"
import { BarChart } from "@/components/charts/BarChart"
import { FunnelChart } from "@/components/charts/FunnelChart"

export default function AnalyticsPage() {
    const { charts: data, stats, fetchAnalytics, isLoading } = useAnalyticsStore()

    useEffect(() => {
        fetchAnalytics()
    }, [fetchAnalytics])

    if (isLoading || !data) return <AnalyticsSkeleton />

    // Helper to access KPI data safely from new structure
    const kpi = {
        totalLeads: stats?.metrics?.totalLeads?.value || 0,
        qualifiedLeads: stats?.metrics?.qualifiedLeads?.value || 0,
        conversionRate: stats?.metrics?.conversionRate?.value || '0%',
        pipelineRevenue: stats?.metrics?.pipelineRevenue?.value || '$0'
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* ... Header ... */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Performance & Lead Analytics</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Deep-dive into your acquisition channels and conversion metrics.</p>
                </div>
                {/* ... Filters ... */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-white dark:bg-[#1a2433] rounded-lg border border-slate-200 dark:border-slate-800 p-1 flex items-center">
                        <button className="px-3 py-1.5 text-sm font-medium rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">7D</button>
                        <button className="px-3 py-1.5 text-sm font-medium rounded bg-primary text-white shadow-sm">30D</button>
                        <button className="px-3 py-1.5 text-sm font-medium rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">90D</button>
                        <button className="px-3 py-1.5 text-sm font-medium rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Custom</button>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Total Leads"
                    value={kpi.totalLeads.toLocaleString()}
                    icon={Users}
                    iconColor="text-primary bg-primary/10"
                    trend={stats?.metrics?.totalLeads?.trend}
                    trendUp={stats?.metrics?.totalLeads?.trendUp}
                    color="primary"
                />
                <KPICard
                    title="Qualified Leads"
                    value={kpi.qualifiedLeads.toLocaleString()}
                    icon={ShieldCheck}
                    iconColor="text-purple-500 bg-purple-500/10"
                    trend={stats?.metrics?.qualifiedLeads?.trend}
                    trendUp={stats?.metrics?.qualifiedLeads?.trendUp}
                    color="purple"
                />
                <KPICard
                    title="Conversion Rate"
                    value={kpi.conversionRate}
                    icon={TrendingUp}
                    iconColor="text-teal-500 bg-teal-500/10"
                    trend={stats?.metrics?.conversionRate?.trend}
                    trendUp={stats?.metrics?.conversionRate?.trendUp}
                    color="teal"
                />
                <KPICard
                    title="Pipeline Revenue"
                    value={kpi.pipelineRevenue}
                    icon={DollarSign}
                    iconColor="text-amber-500 bg-amber-500/10"
                    trend={stats?.metrics?.pipelineRevenue?.trend}
                    trendUp={stats?.metrics?.pipelineRevenue?.trendUp}
                    color="amber"
                />
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Leads by Source (Bar Chart) - Spans 2 cols */}
                <Card className="lg:col-span-2 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Leads by Source</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Comparing acquisition channels performance</p>
                        </div>
                    </div>
                    {/* Chart Area */}
                    <div className="h-64 relative w-full">
                        <BarChart data={data.sources || []} height={256} />
                    </div>
                </Card>

                {/* Conversion Status - Spans 1 col */}
                <Card className="p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Pipeline</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Current lead status distribution</p>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3 justify-center">
                        <FunnelChart data={data.pipelineStatus || []} />
                    </div>
                </Card>

                {/* Global Lead Distribution */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Global Distribution</h2>
                        <button className="text-xs text-primary font-medium hover:underline">View Map</button>
                    </div>
                    <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4 bg-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVzGXHTsrawRDqLqwJo5oOjCMS5P_cnJI1y9g1IUQgPonUo4h9JjDkNDB79Laz7qTFuTA0HmhsTLR8F_XndD_pQNM17BqhMy8TPzDXHBMmibLcUEEG9eD9MdcWLP5HrpqOIADitnpmCqUSlJc6to1MT-OfyDaLEQAPXULiwEvY68FgsZW7VAAPnDPZOarVuFy-NQODUzbmN-MD95vPP_If-bbeY0UaEOj5Ud0SfTHG38ZUe2zd-v-qC30VTG6E5aSgfWOva8J_rHKP" alt="World Map Visualization" />
                        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-primary rounded-full animate-ping delay-75"></div>
                        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                        <CountryStat name="United States" value="1,240" />
                        <CountryStat name="United Kingdom" value="856" />
                        <CountryStat name="China" value="412" />
                        <CountryStat name="Germany" value="234" />
                    </div>
                </Card>
            </div>
        </div>
    )
}

function KPICard({ title, value, icon: Icon, iconColor, trend, trendUp, color }: any) {
    const bgClass = color === 'primary'
        ? `bg-primary/5 dark:bg-primary/10`
        : `bg-${color}-500/5 dark:bg-${color}-500/10`

    return (
        <Card className={`p-5 relative overflow-hidden group`}>
            <div className={`absolute right-0 top-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 opacity-5 ${bgClass}`}></div>
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <Badge variant="outline" className={`gap-1 border-0 ${trendUp ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                    {trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {trend}
                </Badge>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{value}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{title}</p>
        </Card>
    )
}

function CountryStat({ name, value }: any) {
    return (
        <div className="flex items-center justify-between p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-6 h-4 bg-slate-700 rounded overflow-hidden relative">
                    {/* Simplified flag placeholder */}
                    <div className="absolute inset-0 bg-slate-600"></div>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{name}</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{value}</span>
        </div>
    )
}
