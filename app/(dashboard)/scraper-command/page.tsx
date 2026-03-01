"use client"

import { useEffect, useState } from "react"
import {
    Power,
    UserPlus,
    TrendingUp,
    ShieldCheck,
    Clock,
    Sliders,
    Terminal as TerminalIcon,
    Ban,
    Copy,
    Download,
    Home
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useScraperStore } from "@/store/useScraperStore"
import { cn } from "@/lib/utils"

export default function ScraperPage() {
    const { isRunning, logs, stats, startScraper, stopScraper, fetchStatus, fetchLogs, clearLogs } = useScraperStore()

    useEffect(() => {
        fetchStatus()
        fetchLogs()

        const interval = setInterval(() => {
            fetchStatus()
            if (isRunning) {
                fetchLogs()
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [fetchStatus, fetchLogs, isRunning])

    const handleToggleEngine = async () => {
        if (isRunning) {
            await stopScraper()
        } else {
            await startScraper({ source: 'linkedin', query: 'SaaS Founders' })
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] -m-6 md:-m-8 overflow-hidden animate-in fade-in duration-300">
            {/* Top Header */}
            <header className="h-16 bg-white dark:bg-[#151e2b] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <nav aria-label="Breadcrumb" className="flex">
                        <ol className="flex items-center space-x-2">
                            <li><a className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400" href="#"><Home className="w-4 h-4" /></a></li>
                            <li><span className="text-slate-300 dark:text-slate-600">/</span></li>
                            <li><a className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" href="#">Engine</a></li>
                            <li><span className="text-slate-300 dark:text-slate-600">/</span></li>
                            <li><span aria-current="page" className="text-sm font-medium text-primary">Command Center</span></li>
                        </ol>
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex h-2 w-2 relative">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isRunning ? 'bg-emerald-400' : 'bg-red-400'} opacity-75`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunning ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    </span>
                    <span className={`text-xs font-mono font-semibold tracking-wider ${isRunning ? 'text-emerald-500' : 'text-red-500'}`}>
                        {isRunning ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
                    </span>
                </div>
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
                {/* Control Plane (Top Half) */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Main Control Card */}
                    <Card className="xl:col-span-4 bg-white dark:bg-[#1a2433] border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group min-h-[300px]">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                            <Power className={`w-32 h-32 ${isRunning ? 'text-emerald-500' : 'text-red-500'} transform rotate-12 translate-x-8 -translate-y-8`} />
                        </div>
                        <div className="flex justify-between items-start z-10">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Engine Status</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Control AI extraction process</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${isRunning ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                {isRunning ? 'RUNNING' : 'STOPPED'}
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-8 z-10">
                            <div className="relative">
                                {isRunning && <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"></div>}
                                {isRunning && <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-pulse"></div>}
                                <button
                                    onClick={handleToggleEngine}
                                    className={`relative w-24 h-24 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center group active:scale-95 ${isRunning ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/40' : 'bg-red-500 hover:bg-red-600 shadow-red-500/40'}`}
                                >
                                    <Power className="text-white w-10 h-10" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 z-10">
                            <div className="bg-slate-50 dark:bg-[#101722] rounded-lg p-3 border border-slate-200 dark:border-slate-700/50">
                                <span className="text-xs text-slate-500 dark:text-slate-500 block">Session ID</span>
                                <span className="font-mono text-sm font-semibold dark:text-slate-300">#IDX-9921</span>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#101722] rounded-lg p-3 border border-slate-200 dark:border-slate-700/50">
                                <span className="text-xs text-slate-500 dark:text-slate-500 block">Uptime</span>
                                <span className="font-mono text-sm font-semibold dark:text-slate-300">04:21:12</span>
                            </div>
                        </div>
                    </Card>

                    {/* Metrics & Schedule Column */}
                    <div className="xl:col-span-8 flex flex-col gap-6">
                        {/* Metrics Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Leads Metric */}
                            <Card className="bg-white dark:bg-[#1a2433] border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <UserPlus className="text-blue-500 w-6 h-6" />
                                    </div>
                                    <span className="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                                        +12.5% <TrendingUp className="w-3 h-3 ml-1" />
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stats ? stats.leadsScraped.toLocaleString() : '0'}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Leads Scraped Today</p>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "65%" }}></div>
                                </div>
                            </Card>

                            {/* Success Rate Metric */}
                            <Card className="bg-white dark:bg-[#1a2433] border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-violet-500/10 rounded-lg">
                                        <ShieldCheck className="text-violet-500 w-6 h-6" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stats ? stats.successRate + '%' : '0%'}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Success Rate</p>
                                <div className="flex gap-1 mt-4">
                                    <div className="h-1.5 flex-1 bg-violet-500 rounded-full"></div>
                                    <div className="h-1.5 flex-1 bg-violet-500 rounded-full"></div>
                                    <div className="h-1.5 flex-1 bg-violet-500 rounded-full"></div>
                                    <div className="h-1.5 flex-1 bg-violet-500/30 rounded-full"></div>
                                </div>
                            </Card>

                            {/* Schedule/Next Run */}
                            <Card className="bg-white dark:bg-[#1a2433] border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-orange-500/10 rounded-lg">
                                        <Clock className="text-orange-500 w-6 h-6" />
                                    </div>
                                    <button className="text-xs text-primary hover:underline">Edit Schedule</button>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-2">02:00 UTC</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Next scheduled run</p>
                                </div>
                                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                                    <span className="text-xs text-slate-500">Frequency:</span>
                                    <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">Daily</span>
                                </div>
                            </Card>
                        </div>

                        {/* Config Quick Actions */}
                        <Card className="bg-white dark:bg-[#1a2433] border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between gap-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Sliders className="text-slate-400 w-5 h-5" />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Active Profile: <span className="text-slate-900 dark:text-white">Tech SaaS Extraction</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 mr-2">Throttle: 45 req/m</span>
                                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
                                <span className="text-xs text-slate-500 ml-2">Proxies: Rotating (US)</span>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Data Plane (Bottom Half - Logs) */}
                <div className="flex flex-col min-h-[400px] bg-[#0d1117] rounded-xl border border-slate-800 overflow-hidden shadow-lg">
                    {/* Log Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-800">
                        <div className="flex items-center gap-3">
                            <TerminalIcon className="text-slate-500 w-4 h-4" />
                            <span className="text-xs font-mono font-medium text-slate-300">Live Execution Logs</span>
                            <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IconButton icon={Ban} title="Clear Console" onClick={clearLogs} />
                            <IconButton icon={Copy} title="Copy All" />
                            <IconButton icon={Download} title="Download Log" />
                        </div>
                    </div>
                    {/* Terminal Content */}
                    <div className="flex-1 p-4 font-mono text-xs md:text-sm overflow-y-auto bg-[#0d1117] space-y-1">
                        <style jsx>{`
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #0d1117; }
                ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #475569; }
             `}</style>
                        {logs.length === 0 && (
                            <div className="text-slate-600 italic">Console ready. Waiting for engine start...</div>
                        )}
                        {logs.map((log, index) => (
                            <LogEntry key={index} time={new Date(log.timestamp).toLocaleTimeString()} level={log.level}
                                levelColor={log.level === 'INFO' ? 'text-blue-400' : log.level === 'WARN' ? 'text-yellow-500' : log.level === 'ERROR' ? 'text-red-500' : 'text-emerald-400'}
                                message={log.message} />
                        ))}

                        <div className="flex gap-3 px-2 py-0.5 rounded -mx-2 opacity-50">
                            <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                            <span className="text-slate-500 shrink-0">....</span>
                            <span className="text-slate-300 animate-pulse">_</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function IconButton({ icon: Icon, title, onClick }: any) {
    return (
        <button onClick={onClick} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors" title={title}>
            <Icon className="w-4 h-4" />
        </button>
    )
}

function LogEntry({ time, level, levelColor, message }: any) {
    return (
        <div className="flex gap-3 text-slate-400 hover:bg-[#161b22] px-2 py-0.5 rounded -mx-2">
            <span className="text-slate-600 shrink-0">[{time}]</span>
            <span className={`${levelColor} shrink-0 w-12`}>{level}</span>
            <span className="text-slate-300">{message}</span>
        </div>
    )
}
