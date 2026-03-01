"use client"

import {
    Upload,
    Plus,
    Search,
    Building2,
    Link as LinkIcon,
    BarChart2,
    ChevronDown,
    X,
    MoreVertical,
    Copy,
    MapPin,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function ClientsPage() {
    return (
        <div className="max-w-[1600px] w-full mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Leads</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and track your AI-generated prospects.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <Upload className="w-4 h-4" />
                        Import CSV
                    </Button>
                    <Button className="gap-2 shadow-lg shadow-primary/25">
                        <Plus className="w-4 h-4" />
                        Add New Lead
                    </Button>
                </div>
            </div>

            {/* Filters & Search */}
            <Card className="p-4">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                    <div className="relative w-full lg:w-96">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="w-4 h-4 text-slate-400" />
                        </span>
                        <Input
                            placeholder="Search by company, name, or email..."
                            className="pl-10 h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <Button variant="outline" className="gap-2 font-normal text-slate-700 dark:text-slate-300">
                            <Building2 className="w-4 h-4 text-slate-400" />
                            Industry
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </Button>

                        <Button variant="outline" className="gap-2 font-normal text-slate-700 dark:text-slate-300">
                            <LinkIcon className="w-4 h-4 text-slate-400" />
                            Source
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </Button>

                        <Button variant="outline" className="gap-2 font-normal text-slate-700 dark:text-slate-300">
                            <BarChart2 className="w-4 h-4 text-slate-400" />
                            Score: High
                            <X className="w-4 h-4 text-slate-400 hover:text-red-500" />
                        </Button>

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

                        <Button variant="outline" disabled className="gap-2 font-normal opacity-60">
                            Bulk Actions
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Data Table */}
            <Card className="overflow-hidden flex flex-col h-[calc(100vh-320px)] min-h-[500px] border-0 shadow-sm relative">
                <div className="overflow-x-auto flex-1 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left w-12"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Score</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Contact Info</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Industry</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Source</th>
                                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-card-dark divide-y divide-slate-200 dark:divide-slate-800">
                            <ClientRow
                                company="TechNova Systems" website="technova.io" logo="https://lh3.googleusercontent.com/aida-public/AB6AXuAskz9-bl7JnFSBF3ExUBrJlb_po-0226nuPUhgRHLMPHmliv8g4wWheBagGM6w6J7sGDsMuEVBnEwvPgZVG-cLBx-xHxszpNrQwjOrl_xeMuNwVUekqn9U0JPHf0iameFS6RBTG61MModjd1Q3kTkCOeK2MB-KSve4IFspDOJKl-DpaCpgI1uQrBqn9fqsTsXGZ7bIx-KS6lDhyTqXZVxRExF2DeCtmldlkrWhOvPUzrClkvGyilXlsQN0w5uUsYxcYIh7bXFwRwnG"
                                score={92} status="Qualified" statusVariant="default"
                                email="sarah.j@technova.io" phone="+1 (555) 001-2834"
                                industry="SaaS / Enterprise"
                                location="Austin, TX"
                                source="LinkedIn" sourceColor="bg-purple-500"
                                id="1"
                            />
                            <ClientRow
                                company="GreenField Energy" website="greenfield.energy" logo="https://lh3.googleusercontent.com/aida-public/AB6AXuAfiY-ZghxkS-zjqoqBzUML6yoztMp4YgSw02XGs3IfgeaSr693imWptlgfdFp808EuhzOohvfODQoBoJ03FHytRXjCZz1cl7FkrOXHXHNxK3CHfw8XFAvmGZHgZeHO6PDlU-T4WTHsAfBvT_PQ9VXdp1NTP436qfcvON4BoDLX2iUuMll-4BoLICJOdnp63i2tJYSRT0q4IJqeuu0x2eoqxvT5yt5GLebGQF7eRew0Xs0PQkdpACsnpDJFU5-4731MKuDZ7RrZDrua"
                                score={45} status="New Lead" statusVariant="outline"
                                email="info@greenfield.energy" phone="+1 (303) 555-9821"
                                industry="Clean Tech"
                                location="Denver, CO"
                                source="Inbound" sourceColor="bg-orange-500"
                                id="2"
                            />
                            <ClientRow
                                company="Nexus AI Solutions" website="nexus.ai" logo="https://lh3.googleusercontent.com/aida-public/AB6AXuBN7S7-EVstXC3ZDaNTGw_VBfB0wBHJxRHyiZd58IOxAzG7jcirOknlHg6B7wuKP0PN0rlE8JsAMaEAkBARDS9Xfq1Uw1NnyhhZlQM0OYWyE6ybL0YzyGWdUAyTp_7QjOcRFqOFhpN8jNSXl8k4BK7PupL2OLJUEjLaA90Y-KVBWRH-CQpGRm15YAJhvSvXn5IDZzEEZr9b4Q--yvoS_sz91hVhaD09PAo9HBqzxB8zwlRjOrXloxUpNA5PoqP_eJWrpK5X_89WdWY9"
                                score={78} status="Contacted" statusVariant="secondary"
                                email="sales@nexus.ai" phone="+1 (415) 555-0192"
                                industry="Artificial Intelligence"
                                location="San Francisco, CA"
                                source="Cold Email" sourceColor="bg-blue-500"
                                id="3"
                            />
                            <ClientRow
                                company="Apex Logistics" website="apexlogistics.com" logo="https://lh3.googleusercontent.com/aida-public/AB6AXuAX5gQg9VYYQ-lbHiuRJHINSe6Q2W_BMZU8DQuLdH-fYIIuhGVxXDAyupIW8TA3KfPL2Ii5rmJtCELY-zIHm4HtHVdK1fIFMDU-okvZVLk8eTrBEqtsB7a_nx2A6ihSy-YvV096-CT8W4_zbvncsCaG290cxzcHvU8zLlP33qVQ5tj79oAQ6eyBIm_oIzgxQX-iPe4zo1N59csSYz3zxZBk7ZRR1rL6Zk89XYgqfKs3tWxuhghfjZJ0m-e0QaAIojAV8ZKTDZMX3mQD"
                                score={88} status="Negotiation" statusVariant="warning"
                                email="m.roberts@apexlogistics.com" phone="+1 (206) 555-8821"
                                industry="Supply Chain"
                                location="Seattle, WA"
                                source="LinkedIn" sourceColor="bg-purple-500"
                                id="4"
                            />
                            <ClientRow
                                company="Bright Finance" website="brightfi.co" logo="https://lh3.googleusercontent.com/aida-public/AB6AXuB4wpFPAKkt52cF-T4RKmgywN41oeOnOb9kzeidguibgRsHiZB5JR23DQDfrHzrkrY-gnwRdaQWSBTtdqPFJVQjO-wf-W3iTC2WwT9S0BkAhSXmXyDZMpfVgu4vq8R7svZPcRTlhsQj9yJxd_jOZoT57jX_7_VuJcKTBrRE16SkfHdDiHrkAUraCQwR-7zVv83ZqzAs4Ak37MKiSn0pNR6mg0tyvQNA8QNx8BKkdWUnxXg-hjc6JbDWKnwpsL13ULBCulB7p1ZtaWwZ"
                                score={65} status="New Lead" statusVariant="outline"
                                email="hello@brightfi.co" phone="+1 (212) 555-1234"
                                industry="FinTech"
                                location="New York, NY"
                                source="Webinar" sourceColor="bg-pink-500"
                                id="5"
                            />
                        </tbody>
                    </table>
                </div>
                {/* Footer */}
                <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <Button variant="outline" size="sm">Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">2,493</span> results
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <Button variant="outline" size="icon" className="rounded-l-md w-8 h-8"><ChevronLeft className="w-4 h-4" /></Button>
                                <Button variant="outline" size="sm" className="bg-primary/10 border-primary text-primary hover:bg-primary/20">1</Button>
                                <Button variant="outline" size="sm" className="hidden md:inline-flex">2</Button>
                                <Button variant="outline" size="sm" className="hidden md:inline-flex">3</Button>
                                <span className="relative inline-flex items-center px-4 py-2 border border-input bg-background text-sm font-medium text-muted-foreground">...</span>
                                <Button variant="outline" size="sm" className="hidden md:inline-flex">8</Button>
                                <Button variant="outline" size="sm" className="hidden md:inline-flex">9</Button>
                                <Button variant="outline" size="icon" className="rounded-r-md w-8 h-8"><ChevronRight className="w-4 h-4" /></Button>
                            </nav>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

function ClientRow({ company, website, logo, score, status, statusVariant, email, phone, industry, location, source, sourceColor, id }: any) {
    return (
        <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap w-12">
                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="h-10 w-10 rounded-lg object-cover" src={logo} alt={company} />
                    </div>
                    <div className="ml-4">
                        <Link href={`/clients/${id}`} className="text-sm font-medium text-slate-900 dark:text-white hover:text-primary transition-colors">
                            {company}
                        </Link>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{website}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className={`relative flex items-center justify-center w-9 h-9 rounded-full font-bold text-sm ring-1 ring-inset ${score > 80 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20' :
                        score > 60 ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 ring-yellow-500/20' :
                            'bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20'
                        }`}>
                        {score}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={statusVariant}>{status}</Badge>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                    {email}
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{phone}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-500 dark:text-slate-300">{industry}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-500 dark:text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {location}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${sourceColor}`}></span>
                    {source}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </td>
        </tr>
    )
}
