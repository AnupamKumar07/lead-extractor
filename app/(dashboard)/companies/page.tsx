"use client"

import { useEffect, useState } from "react"
import { Plus, Search, MapPin, Globe, Building2, MoreHorizontal, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useCompanyStore } from "@/store/useCompanyStore"

export default function CompaniesPage() {
    const { companies, fetchCompanies, addCompany, isLoading } = useCompanyStore()
    const [searchTerm, setSearchTerm] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [newCompany, setNewCompany] = useState({
        name: "",
        domain: "",
        industry: "",
        location: "",
        website: "",
        estimated_company_size: "",
        revenue_range: "",
        description: "",
        linkedin_url: ""
    })

    useEffect(() => {
        fetchCompanies()
    }, [fetchCompanies])

    const handleCreateCompany = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await addCompany(newCompany as any)
            setIsDialogOpen(false)
            setNewCompany({ name: "", domain: "", industry: "", location: "", website: "", estimated_company_size: "", revenue_range: "", description: "", linkedin_url: "" })
        } catch (error) {
            console.error("Failed to create company", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.industry || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.location || "").toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Companies</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your target accounts and organizations.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="shadow-lg shadow-primary/20">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Company
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Company</DialogTitle>
                            <DialogDescription>
                                Enter the details of the company you want to track.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateCompany} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Company Name</Label>
                                    <Input
                                        id="name"
                                        value={newCompany.name}
                                        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                                        placeholder="Acme Inc."
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="domain">Domain (Unique)</Label>
                                    <Input
                                        id="domain"
                                        value={newCompany.domain}
                                        onChange={(e) => setNewCompany({ ...newCompany, domain: e.target.value })}
                                        placeholder="acme.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="industry">Industry</Label>
                                    <Input
                                        id="industry"
                                        value={newCompany.industry}
                                        onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
                                        placeholder="Technology"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="estimated_company_size">Employees</Label>
                                    <Input
                                        id="estimated_company_size"
                                        value={newCompany.estimated_company_size}
                                        onChange={(e) => setNewCompany({ ...newCompany, estimated_company_size: e.target.value })}
                                        placeholder="100-500"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="revenue">Revenue (Annual)</Label>
                                <Input
                                    id="revenue"
                                    value={newCompany.revenue_range}
                                    onChange={(e) => setNewCompany({ ...newCompany, revenue_range: e.target.value })}
                                    placeholder="$1M - $5M"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={newCompany.location}
                                    onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                                    placeholder="San Francisco, CA"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    value={newCompany.website}
                                    onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
                                    placeholder="https://acme.com"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={newCompany.description}
                                    onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
                                    placeholder="Brief description of the company"
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Company"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-card-dark">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search companies..."
                        className="pl-9 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading && companies.length === 0 ? (
                    Array(6).fill(0).map((_, i) => (
                        <Card key={i} className="p-6 space-y-4 animate-pulse">
                            <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            </div>
                        </Card>
                    ))
                ) : filteredCompanies.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-slate-500">No companies found matching your search.</div>
                ) : (
                    filteredCompanies.map((company) => (
                        <Card key={company.id} className="p-6 hover:shadow-md transition-shadow bg-white dark:bg-card-dark group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
                                    {company.name.charAt(0)}
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>
                            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{company.name}</h3>
                            <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 shrink-0" />
                                    <span>{company.industry}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                    <span>{company.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 shrink-0" />
                                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline truncate">
                                        {company.website}
                                    </a>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-normal">
                                    {company.estimated_company_size || 'Unknown'} employees
                                </Badge>
                                <span className="text-xs text-slate-500">{company.revenue_range || 'N/A'}</span>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
