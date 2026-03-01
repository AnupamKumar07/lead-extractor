"use client"

import { memo } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowRight } from "lucide-react"

export const RecentLeads = memo(function RecentLeads({ leads }: { leads: any[] }) {
    return (
        <div className="overflow-x-auto bg-white dark:bg-card-dark border-x border-b border-slate-200 dark:border-slate-800 rounded-b-xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                        <th className="p-4 font-medium">Lead Name</th>
                        <th className="p-4 font-medium">Company</th>
                        <th className="p-4 font-medium">AI Score</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                    {leads && leads.length > 0 ? (
                        leads.map((lead: any) => (
                            <LeadRow
                                key={lead.id}
                                name={`${lead.first_name} ${lead.last_name}`}
                                company={lead.company || 'N/A'}
                                score={lead.lead_score}
                                status={lead.status}
                                statusColor={lead.status.toLowerCase() === 'qualified' ? 'purple' : lead.status.toLowerCase() === 'new' ? 'blue' : 'default'}
                                initials={`${lead.first_name?.[0] || ''}${lead.last_name?.[0] || ''}`}
                                initialsColor="bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                            />
                        ))
                    ) : (
                        <tr><td colSpan={5} className="p-4 text-center text-slate-500">No leads found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
})

function LeadRow({ name, company, score, status, statusColor, initials, initialsColor, avatar }: any) {
    return (
        <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <td className="p-4">
                <div className="flex items-center gap-3">
                    {avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img alt="Lead" className="w-8 h-8 rounded-full" src={avatar} />
                    ) : (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${initialsColor}`}>
                            {initials}
                        </div>
                    )}
                    <div className="font-medium text-slate-900 dark:text-white">{name}</div>
                </div>
            </td>
            <td className="p-4 text-slate-500 dark:text-slate-400">{company}</td>
            <td className="p-4">
                <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full w-[${score}%] ${score > 90 ? 'bg-emerald-500' : score > 80 ? 'bg-purple-500' : 'bg-yellow-500'}`}
                            style={{ width: `${score}%` }}
                        ></div>
                    </div>
                    <span className={`text-xs font-medium ${score > 90 ? 'text-emerald-500' : score > 80 ? 'text-purple-500' : 'text-yellow-500'}`}>
                        {score}
                    </span>
                </div>
            </td>
            <td className="p-4">
                <Badge variant={statusColor === 'blue' ? 'default' : statusColor === 'purple' ? 'secondary' : 'outline'}>
                    {status}
                </Badge>
            </td>
            <td className="p-4 text-right">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </td>
        </tr>
    )
}
