import { memo } from "react"
import Link from "next/link"
import { Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SmartTagList, SmartTag } from "@/components/dashboard/SmartTags"
import { Lead } from "@/types/lead"

interface LeadsTableProps {
    leads: Lead[]
    isLoading: boolean
    onDelete: (id: string) => void
}

export const LeadsTable = memo(function LeadsTable({ leads, isLoading, onDelete }: LeadsTableProps) {
    if (isLoading && leads.length === 0) {
        return (
            <div className="p-8 text-center text-slate-500">
                Loading leads...
            </div>
        )
    }

    if (leads.length === 0) {
        return (
            <div className="p-8 text-center text-slate-500">
                No leads found matching your criteria.
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                        <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Name</th>
                        <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Company</th>
                        <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Score</th>
                        <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Intelligence</th>
                        <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Status</th>
                        <th className="p-4 font-medium text-slate-500 dark:text-slate-400 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {leads.map((lead) => (
                        <LeadRow key={lead.id} lead={lead} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    )
})

const LeadRow = memo(function LeadRow({ lead, onDelete }: { lead: Lead, onDelete: (id: string) => void }) {
    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
            <td className="p-4">
                <div className="font-medium text-slate-900 dark:text-white">{lead.first_name} {lead.last_name}</div>
                <div className="text-xs text-slate-500">{lead.job_title}</div>
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-300">
                {lead.company || 'N/A'}
            </td>
            <td className="p-4">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${(lead.lead_score || 0) > 80 ? 'bg-emerald-500' : (lead.lead_score || 0) > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <span className="font-medium">{lead.lead_score || 0}</span>
                </div>
            </td>
            <td className="p-4">
                <SmartTagList tags={lead.intent_signals || []} type="intent" />
            </td>
            <td className="p-4 flex gap-2 items-center">
                <Badge variant={lead.status === 'Qualified' ? 'default' : lead.status === 'New' ? 'secondary' : 'outline'} className="capitalize">
                    {lead.status}
                </Badge>
                {lead.risk_flag && lead.risk_flag !== "Low" && (
                    <SmartTag type="risk" value={lead.risk_flag + " Risk"} />
                )}
            </td>
            <td className="p-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/dashboard/leads/${lead.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <Edit className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => onDelete(lead.id)}
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                </div>
            </td>
        </tr>
    )
})
