"use client"

import {
    Plus,
    Terminal,
    Eye,
    Copy,
    Trash2,
    FlaskConical
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useSettingsStore, ApiKey } from "@/store/useSettingsStore"

export default function SourcesPage() {
    const { apiKeys, scraperConfig, addApiKey, revokeApiKey, updateScraperConfig } = useSettingsStore()

    const handleCreateKey = () => {
        addApiKey("New Service Key")
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">API & Configuration</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your API access keys and configure the behavior of the lead scraper engine.</p>
            </div>

            {/* API Keys Section */}
            <Card className="overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">API Keys</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">These keys allow external applications to access the Ideanix engine programmatically.</p>
                    </div>
                    <Button onClick={handleCreateKey} className="gap-2 shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        Create New Key
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Key Prefix</th>
                                <th className="px-6 py-3 font-medium">Created</th>
                                <th className="px-6 py-3 font-medium">Last Used</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#151e2d]">
                            {apiKeys.map((key) => (
                                <ApiKeyRow
                                    key={key.id}
                                    apiKey={key}
                                    onRevoke={() => revokeApiKey(key.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Scraper Settings Section */}
            <Card className="p-6 space-y-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Scraper Configuration</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Adjust how the AI engine interacts with target websites.</p>
                </div>

                <div className="space-y-6">
                    {/* Deep Crawling */}
                    <div className="flex items-start justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex-1 pr-8">
                            <Label htmlFor="deep-crawling" className="text-base font-medium text-slate-900 dark:text-white">Deep Crawling</Label>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                When enabled, the scraper will recursively visit links found on the target page (up to 2 levels deep).
                                <span className="text-amber-600 dark:text-amber-500 block mt-1">Note: This consumes 3x more credits.</span>
                            </p>
                        </div>
                        <Switch
                            id="deep-crawling"
                            checked={scraperConfig.deepCrawling}
                            onCheckedChange={(c) => updateScraperConfig({ deepCrawling: c })}
                        />
                    </div>

                    {/* AI Enrichment */}
                    <div className="flex items-start justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex-1 pr-8">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="ai-enrichment" className="text-base font-medium text-slate-900 dark:text-white">AI Enrichment</Label>
                                <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-[10px] font-bold uppercase py-0.5">Beta</Badge>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Uses Large Language Models to infer contact roles, seniority, and department from unstructured text found on "About Us" pages.
                            </p>
                        </div>
                        <Switch
                            id="ai-enrichment"
                            checked={scraperConfig.aiEnrichment}
                            onCheckedChange={(c) => updateScraperConfig({ aiEnrichment: c })}
                        />
                    </div>

                    {/* Request Throttling */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="throttling" className="text-base font-medium text-slate-900 dark:text-white">Request Throttling</Label>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Delay between requests to the same domain.</p>
                            </div>
                            <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">{scraperConfig.requestThrottling / 10}s</span>
                        </div>
                        <input
                            id="throttling"
                            type="range"
                            min="5" max="100"
                            value={scraperConfig.requestThrottling}
                            onChange={(e) => updateScraperConfig({ requestThrottling: parseInt(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-primary"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            <span>0.5s (Aggressive)</span>
                            <span>10s (Stealth)</span>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                    <Button variant="ghost">Discard Changes</Button>
                    <Button className="shadow-lg shadow-primary/20">Save Configuration</Button>
                </div>
            </Card>
        </div>
    )
}

function ApiKeyRow({ apiKey, onRevoke }: { apiKey: ApiKey, onRevoke: () => void }) {
    const Icon = apiKey.name.includes('Production') ? Terminal : FlaskConical
    const iconColor = apiKey.name.includes('Production') ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'

    return (
        <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded ${iconColor}`}>
                        <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{apiKey.name}</span>
                </div>
            </td>
            <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400">{apiKey.prefix}</td>
            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{apiKey.created}</td>
            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{apiKey.lastUsed}</td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconButton icon={Eye} title="Reveal Key" />
                    <IconButton icon={Copy} title="Copy Key" />
                    <IconButton icon={Trash2} title="Revoke Key" className="hover:text-red-500" onClick={onRevoke} />
                </div>
            </td>
        </tr>
    )
}

function IconButton({ icon: Icon, title, className, onClick }: any) {
    return (
        <button onClick={onClick} className={cn("p-1.5 text-slate-400 hover:text-primary dark:hover:text-primary transition-colors", className)} title={title}>
            <Icon className="w-4 h-4" />
        </button>
    )
}
