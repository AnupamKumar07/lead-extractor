"use client"

import { useEffect, useState, use } from "react"
import { ArrowLeft, Building2, Mail, Phone, Globe, Linkedin, Calendar, Edit, Trash, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SmartTag, SmartTagList } from "@/components/dashboard/SmartTags"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use()
    const { id } = use(params)
    const [lead, setLead] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<any>({})

    useEffect(() => {
        const fetchLead = async () => {
            const { data, error } = await supabase
                .from('leads')
                .select('*, companies(*)')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Error fetching lead:', error)
            } else {
                setLead(data)
                setFormData(data)
            }
            setLoading(false)
        }

        fetchLead()
    }, [id])

    const handleSave = async () => {
        const { error } = await supabase
            .from('leads')
            .update({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                job_title: formData.job_title,
                linkedin_profile: formData.linkedin_profile
            })
            .eq('id', id)

        if (error) {
            alert('Error updating lead: ' + error.message)
        } else {
            setLead({ ...lead, ...formData })
            setIsEditing(false)
        }
    }

    if (loading) return <div className="p-8 text-center">Loading lead details...</div>
    if (!lead) return <div className="p-8 text-center">Lead not found</div>

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-2">
                <Link href="/leads">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{lead.first_name} {lead.last_name}</h1>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{lead.companies?.name}</span>
                        <span>•</span>
                        <span>{lead.job_title}</span>
                    </div>
                </div>
                <div className="ml-auto flex gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="outline" size="sm" onClick={() => { setIsEditing(false); setFormData(lead); }}>
                                Cancel
                            </Button>
                            <Button size="sm" onClick={handleSave}>
                                <Save className="w-3.5 h-3.5 mr-2" />
                                Save Changes
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                <Edit className="w-3.5 h-3.5 mr-2" />
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={async () => {
                                    if (confirm('Are you sure you want to delete this lead?')) {
                                        const { error } = await supabase.from('leads').delete().eq('id', id)
                                        if (error) {
                                            alert('Error deleting lead: ' + error.message)
                                        } else {
                                            router.push('/leads')
                                        }
                                    }
                                }}
                            >
                                <Trash className="w-3.5 h-3.5 mr-2" />
                                Delete
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Info Card */}
                    <Card className="p-6 bg-white dark:bg-card-dark">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Contact Information</h2>
                            {isEditing && (
                                <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">Editing Mode</Badge>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">First Name</span>
                                {isEditing ? (
                                    <Input
                                        value={formData.first_name || ''}
                                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                        className="h-8"
                                    />
                                ) : (
                                    <div className="text-slate-900 dark:text-slate-200 font-medium">{lead.first_name || 'N/A'}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">Last Name</span>
                                {isEditing ? (
                                    <Input
                                        value={formData.last_name || ''}
                                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                        className="h-8"
                                    />
                                ) : (
                                    <div className="text-slate-900 dark:text-slate-200 font-medium">{lead.last_name || 'N/A'}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">Email</span>
                                {isEditing ? (
                                    <Input
                                        value={formData.email || ''}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="h-8"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        {lead.email || 'N/A'}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">Job Title</span>
                                {isEditing ? (
                                    <Input
                                        value={formData.job_title || ''}
                                        onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                                        className="h-8"
                                    />
                                ) : (
                                    <div className="text-slate-900 dark:text-slate-200">{lead.job_title || 'N/A'}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">LinkedIn</span>
                                {isEditing ? (
                                    <Input
                                        value={formData.linkedin_profile || ''}
                                        onChange={(e) => setFormData({ ...formData, linkedin_profile: e.target.value })}
                                        className="h-8"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-blue-500">
                                        <Linkedin className="w-4 h-4" />
                                        <a href={lead.linkedin_profile || '#'} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-[200px]">
                                            {lead.linkedin_profile ? 'View Profile' : 'N/A'}
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">Company</span>
                                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200">
                                    <Building2 className="w-4 h-4 text-slate-400" />
                                    {lead.companies?.name || 'N/A'}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">Phone</span>
                                <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    {lead.companies?.phone || 'N/A'}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">Website</span>
                                <div className="flex items-center gap-2 text-blue-500">
                                    <Globe className="w-4 h-4" />
                                    <a href={lead.companies?.website || '#'} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {lead.companies?.website || 'N/A'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Intelligence Center Card */}
                    <Card className="p-6 bg-white dark:bg-card-dark border-primary/20">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Premium Intelligence
                            </h2>
                            <div className="flex gap-2">
                                {lead.risk_flag && lead.risk_flag !== "Low" && (
                                    <SmartTag type="risk" value={lead.risk_flag + " Risk"} />
                                )}
                                <Badge variant="secondary" className="bg-primary/10 text-primary dark:bg-primary/20">
                                    Score: {lead.lead_score || 0}/100
                                </Badge>
                            </div>
                        </div>

                        {/* Extracted Signals */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <span className="text-xs font-medium text-slate-500">Confidence</span>
                                    <div className="font-semibold text-slate-900 dark:text-white">{lead.data_confidence_score || 0}%</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-medium text-slate-500">Opportunity</span>
                                    <div className="font-semibold text-emerald-600 dark:text-emerald-400">{lead.opportunity_score || 0}/100</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-medium text-slate-500">Deal Est.</span>
                                    <div className="font-semibold text-slate-900 dark:text-white">{lead.deal_potential_estimate || 'Unknown'}</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-medium text-slate-500">Freshness</span>
                                    <div className="font-semibold text-slate-900 dark:text-white">{lead.freshness_tag || 'Unknown'}</div>
                                </div>
                            </div>

                            <Separator className="my-4 dark:border-slate-800" />

                            <div className="space-y-3">
                                <div>
                                    <span className="text-xs font-medium text-slate-500 mb-2 block">Detected Intent Signals</span>
                                    {lead.intent_signals && lead.intent_signals.length > 0 ? (
                                        <SmartTagList tags={lead.intent_signals} type="intent" />
                                    ) : (
                                        <div className="text-sm text-slate-500 italic">No intent signals detected yet.</div>
                                    )}
                                </div>
                                <div>
                                    <span className="text-xs font-medium text-slate-500 mb-2 block">Smart Classification Tags</span>
                                    {lead.smart_tags && lead.smart_tags.length > 0 ? (
                                        <SmartTagList tags={lead.smart_tags} />
                                    ) : (
                                        <div className="text-sm text-slate-500 italic">Unclassified profile.</div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </Card>
                </div>

                <div className="min-h-[500px]">
                    <Card className="h-full p-6 bg-white dark:bg-card-dark flex flex-col">
                        <h2 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">Activity Timeline</h2>
                        <div className="relative space-y-8 pl-4 border-l border-slate-200 dark:border-slate-800 flex-1">
                            <div className="relative">
                                <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 ring-4 ring-white dark:ring-card-dark"></span>
                                <p className="text-sm text-slate-900 dark:text-white font-medium">Lead Created</p>
                                <p className="text-xs text-slate-500 mt-1">Added via {lead.source || 'Direct Entry'}</p>
                                <p className="text-xs text-slate-400 mt-1">{new Date(lead.created_at).toLocaleDateString()}</p>
                            </div>
                            {/* Placeholder for timeline items */}
                            <div className="relative">
                                <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-card-dark"></span>
                                <p className="text-sm text-slate-900 dark:text-white font-medium">Status Updated</p>
                                <p className="text-xs text-slate-500 mt-1">Changed to <span className="font-medium text-slate-700 dark:text-slate-300">{lead.status}</span></p>
                            </div>
                        </div>
                        <Button className="w-full mt-4">Add Activity</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
