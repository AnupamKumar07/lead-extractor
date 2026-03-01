"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useLeadStore } from "@/store/useLeadStore"


export default function AddLeadPage() {
    const router = useRouter()
    const { addLead } = useLeadStore()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        job_title: "",
        company: "",
        email: "",
        phone: "",
        location: "",
        status: "New" as "New" | "Contacted" | "Qualified" | "Converted" | "Lost",
        source: "Manual",
        linkedin_url: "",
        notes: "",
        lead_score: 0,
        opportunity_score: 0,
        data_confidence_score: 0,
        trend_alignment_score: 0,
        deal_potential_estimate: "",
        risk_flag: "Low" as "Low" | "Medium" | "High",
        freshness_tag: "Recently Updated" as "Recently Updated" | "1-6 Months" | "Outdated",
        engagement_status: "Cold",
        smart_tags: [],
        intent_signals: []
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        if (!formData.company) {
            setError("Company Name is required")
            setIsLoading(false)
            return
        }

        try {
            await addLead(formData as any)
            router.push('/dashboard/leads')
        } catch (err: any) {
            console.error(err)
            setError(err.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4">
                <Link href="/leads">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add New Lead</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Enter company details to track a new lead.</p>
                </div>
            </div>

            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark">
                <CardHeader>
                    <CardTitle>Lead Details</CardTitle>
                    <CardDescription>Target company details for this lead.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    placeholder="e.g. John"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    placeholder="e.g. Doe"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="job_title">Job Title</Label>
                            <Input
                                id="job_title"
                                name="job_title"
                                placeholder="e.g. CEO, Marketing Director"
                                value={formData.job_title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="company">Company Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="company"
                                name="company"
                                placeholder="e.g. Acme Corp"
                                value={formData.company}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                <Input
                                    id="linkedin_url"
                                    name="linkedin_url"
                                    placeholder="https://linkedin.com/..."
                                    value={formData.linkedin_url}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="e.g. contact@acme.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Input
                                    id="notes"
                                    name="notes"
                                    placeholder="Enter additional notes..."
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="e.g. San Francisco, CA"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-2">
                            <Link href="/leads">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Lead
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
