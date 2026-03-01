"use client"

import { useEffect, useState, use } from "react"
import { ArrowLeft, Building2, Mail, Phone, Globe, MapPin, Edit, Trash, Save, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CompanyDetailsPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const id = params.id
    const router = useRouter()


    const [company, setCompany] = useState<any>(null)
    const [leads, setLeads] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<any>({})

    useEffect(() => {
        const fetchCompany = async () => {
            const { data, error } = await supabase
                .from('companies')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Error fetching company:', error)
            } else {
                setCompany(data)
                setFormData(data)

                // Fetch associated leads
                const { data: leadsData } = await supabase
                    .from('leads')
                    .select('*')
                    .eq('company_id', id)

                setLeads(leadsData || [])
            }
            setLoading(false)
        }

        fetchCompany()
    }, [id])

    const handleSave = async () => {
        const { error } = await supabase
            .from('companies')
            .update({
                name: formData.name,
                website: formData.website,
                email: formData.email,
                phone: formData.phone,
                industry: formData.industry,
                location: formData.location
            })
            .eq('id', id)

        if (error) {
            alert('Error updating company: ' + error.message)
        } else {
            setCompany({ ...company, ...formData })
            setIsEditing(false)
        }
    }

    if (loading) return <div className="p-8 text-center">Loading company details...</div>
    if (!company) return <div className="p-8 text-center">Company not found</div>

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/companies">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {isEditing ? (
                            <Input
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="h-9 text-lg font-bold w-full max-w-md"
                            />
                        ) : company.name}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Building2 className="w-3.5 h-3.5" />
                        {isEditing ? (
                            <Input
                                value={formData.industry || ''}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                className="h-6 w-32 text-xs"
                                placeholder="Industry"
                            />
                        ) : (company.industry || 'Unknown Industry')}
                    </div>
                </div>
                <div className="ml-auto flex gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="outline" size="sm" onClick={() => { setIsEditing(false); setFormData(company); }}>
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
                                    if (confirm('Are you sure you want to delete this company?')) {
                                        const { error } = await supabase.from('companies').delete().eq('id', id)
                                        if (error) {
                                            alert('Error deleting company: ' + error.message)
                                        } else {
                                            router.push('/companies')
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
                    {/* Company Info */}
                    <Card className="p-6 bg-white dark:bg-card-dark">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Company Details</h2>
                            {isEditing && (
                                <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">Editing Mode</Badge>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">Website</span>
                                {isEditing ? (
                                    <Input
                                        value={formData.website || ''}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        className="h-8"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-blue-500">
                                        <Globe className="w-4 h-4" />
                                        <a href={company.website || '#'} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {company.website || 'N/A'}
                                        </a>
                                    </div>
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
                                        {company.email || 'N/A'}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">Phone</span>
                                {isEditing ? (
                                    <Input
                                        value={formData.phone || ''}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="h-8"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        {company.phone || 'N/A'}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase">Location</span>
                                {isEditing ? (
                                    <Input
                                        value={formData.location || ''}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="h-8"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {company.location || 'N/A'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Associated Leads */}
                    <Card className="bg-white dark:bg-card-dark">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Associated Leads</span>
                                <Link href="/leads/new">
                                    <Button size="sm" variant="outline">Add Lead</Button>
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {leads.length === 0 ? (
                                <div className="text-center py-8 text-slate-500 text-sm">No leads associated with this company.</div>
                            ) : (
                                <div className="space-y-4">
                                    {leads.map(lead => (
                                        <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm text-slate-900 dark:text-white">
                                                        {lead.first_name || lead.last_name ? `${lead.first_name || ''} ${lead.last_name || ''}` : 'Unnamed Lead'}
                                                    </div>
                                                    <div className="text-xs text-slate-500">{lead.job_title || 'No Job Title'}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge variant="secondary" className="text-xs">{lead.status}</Badge>
                                                <Link href={`/dashboard/leads/${lead.id}`}>
                                                    <Button variant="ghost" size="sm">View</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Stats / Side Panel */}
                <div className="space-y-6">
                    <Card className="p-6 bg-white dark:bg-card-dark">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Overview</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Total Leads</span>
                                <span className="font-medium">{leads.length}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Created At</span>
                                <span className="font-medium">{new Date(company.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
