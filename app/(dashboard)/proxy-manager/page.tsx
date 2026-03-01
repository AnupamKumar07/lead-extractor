"use client"

import { useState } from "react"
import { Plus, Trash, Globe, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSettingsStore } from "@/store/useSettingsStore"

export default function ProxyManagerPage() {
    const { proxies, addProxy, deleteProxy } = useSettingsStore()
    const [newProxy, setNewProxy] = useState("")
    const [isAdding, setIsAdding] = useState(false)

    const handleAddProxy = async () => {
        if (!newProxy) return

        setIsAdding(true)
        const [ip, port] = newProxy.split(':')

        await addProxy({
            ip: ip || newProxy,
            port: parseInt(port) || 80,
        })

        setNewProxy("")
        setIsAdding(false)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Proxy Manager</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage rotating proxies for scraping.</p>
            </div>

            <Card className="p-6 bg-white dark:bg-card-dark">
                <div className="flex gap-4 mb-6">
                    <Input
                        placeholder="Enter proxy (IP:Port)"
                        value={newProxy}
                        onChange={(e) => setNewProxy(e.target.value)}
                        className="max-w-md"
                        disabled={isAdding}
                    />
                    <Button onClick={handleAddProxy} disabled={isAdding}>
                        {isAdding ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                        {isAdding ? 'Adding...' : 'Add Proxy'}
                    </Button>
                </div>

                <div className="border rounded-lg overflow-hidden border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="p-4 font-medium text-slate-500">IP Address</th>
                                <th className="p-4 font-medium text-slate-500">Port</th>
                                <th className="p-4 font-medium text-slate-500">Location</th>
                                <th className="p-4 font-medium text-slate-500">Status</th>
                                <th className="p-4 font-medium text-slate-500 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {proxies.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        No proxies configured. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                proxies.map((proxy) => (
                                    <tr key={proxy.id} className="bg-white dark:bg-card-dark">
                                        <td className="p-4 font-mono">{proxy.ip}</td>
                                        <td className="p-4 font-mono">{proxy.port}</td>
                                        <td className="p-4 flex items-center gap-2">
                                            <Globe className="w-3 h-3 text-slate-400" />
                                            {proxy.location}
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={proxy.status === 'active' ? 'default' : proxy.status === 'dead' ? 'destructive' : 'secondary'}>
                                                {proxy.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                                                {proxy.status === 'dead' && <XCircle className="w-3 h-3 mr-1" />}
                                                {proxy.status === 'testing' && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                                                {proxy.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button variant="ghost" size="icon" onClick={() => deleteProxy(proxy.id)}>
                                                <Trash className="w-4 h-4 text-slate-400 hover:text-red-500" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
