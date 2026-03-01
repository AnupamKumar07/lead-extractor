"use client"

import { useEffect, useMemo } from "react"
import { Plus, Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useLeadStore } from "@/store/useLeadStore"
import Link from "next/link"
import { LeadsTable } from "@/components/dashboard/LeadsTable"

export default function LeadsPage() {
    const { leads, filters, setFilters, fetchLeads, isLoading, deleteLead } = useLeadStore()

    useEffect(() => {
        fetchLeads()
    }, [fetchLeads])

    // Memoize the filtered leads to prevent recalculation on every render
    const filteredLeads = useMemo(() => {
        return leads.filter(lead => {
            const searchLower = filters.search.toLowerCase()
            const matchesSearch =
                (lead.first_name?.toLowerCase() || '').includes(searchLower) ||
                (lead.last_name?.toLowerCase() || '').includes(searchLower) ||
                ((lead as any).company?.toLowerCase() || '').includes(searchLower) ||
                (lead.job_title?.toLowerCase() || '').includes(searchLower)

            const matchesStatus = filters.status === "all" || lead.status === filters.status

            return matchesSearch && matchesStatus
        })
    }, [leads, filters.search, filters.status])

    const handleExport = () => {
        if (!filteredLeads.length) return

        const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Company', 'Role', 'Status', 'Score']
        const csvContent = [
            headers.join(','),
            ...filteredLeads.map(lead => [
                lead.id,
                `"${lead.first_name}"`,
                `"${lead.last_name}"`,
                lead.email,
                `"${(lead as any).company}"`,
                `"${lead.job_title}"`,
                lead.status,
                lead.lead_score
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Lead Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and track your potential clients.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Link href="/leads/new">
                        <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Lead
                        </Button>
                    </Link>
                </div>
            </div>

            <Card className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-card-dark">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search leads..."
                        className="pl-9 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
                        value={filters.search}
                        onChange={(e) => setFilters({ search: e.target.value })}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                        <select
                            className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={filters.status}
                            onChange={(e) => setFilters({ status: e.target.value })}
                        >
                            <option value="all">All Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>
                </div>
            </Card>

            <Card className="overflow-hidden bg-white dark:bg-card-dark shadow-sm border border-slate-200 dark:border-slate-800">
                <LeadsTable
                    leads={filteredLeads as any[]}
                    isLoading={isLoading}
                    onDelete={deleteLead}
                />
            </Card>
        </div>
    )
}

