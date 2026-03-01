"use client"

import {
    ChevronRight,
    Edit,
    Check,
    Send,
    Linkedin,
    Globe,
    Mail,
    Phone,
    Copy,
    ExternalLink,
    Sparkles,
    History,
    StickyNote,
    Bold,
    Italic,
    List,
    CheckCircle2,
    FileText,
    Download,
    Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ClientProfilePage({ params }: { params: { id: string } }) {
    // Mock data - in a real app fetch based on params.id
    const client = {
        id: params.id,
        name: "TechNova Solutions",
        location: "San Francisco, CA",
        industry: "Enterprise Software",
        website: "technova.io",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwZ3Ls_jWC-7RBkjNVzNqh1o-P8uNs3WH2aQ0P8yIhv2y4AV-EnYHHZKVkE5nb8PV_7GYb5MIIooU-OcthUSbdBDO9PZqElPK1BogXbq48nM5bqGIjYKAR-XkwvqJl6C3jJbDsmCSe172HjBxJ7jpbNWwFtwGAlezL5xSnIk8PqEc7RtGZ4kj7YiZ6IWOKNApVut5CjhJaMl2tsMF8gS0mn1KIC6eVMtY0a-AI7gOioyFifS-INyarhJ_tFPsSzw79MR8j8Q-823J_",
        status: "Qualified",
        score: 85,
        contact: {
            name: "Sarah Jenkins",
            role: "Chief Technology Officer",
            email: "sarah.j@technova.com",
            phone: "+1 (555) 123-4567",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWqHnbPaSX4VYKZA6yWiWxbYg76F-SLTk39EckZlPRobI81VgQjEWbXJVLJfngl-2Ct6cnIUPgTFoHoR49pHO0w0pz9kBxKpAyspUuE9zggV_u5QtO78YEAIZR7aqFAvPULLjhcsQAlJFZKlhMNxIhPL1kARs1O9cO9gR4Vdo2kBEl0LkUBxbUhc-uQ-SMVszRZAgna2GCa2ppSNlbfWdhYFkn2UNrBk_QXD2k-GDUZ-j_qZoH0rsxudgcRIdIzBDuNrCzJa5XYLsv"
        },
        tags: ["SaaS", "Series B", "Hiring"]
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-white/90 dark:bg-[#151e2b]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 -mx-6 -mt-6 px-6 py-4 sticky top-16 z-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-2">
                            <Link href="/clients" className="hover:text-primary transition-colors">Leads</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="hover:text-primary transition-colors cursor-pointer">SaaS</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-slate-900 dark:text-white font-medium">{client.name}</span>
                        </nav>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{client.name}</h1>
                            <Badge variant="success">
                                {client.status}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" title="Edit Lead">
                            <Edit className="w-4 h-4 text-slate-500" />
                        </Button>
                        <Button variant="outline" className="hidden sm:flex">
                            Mark as Contacted
                        </Button>
                        <Button className="gap-2">
                            <Send className="w-4 h-4" />
                            Send Email
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-4 xl:col-span-3 space-y-6">
                    {/* Profile Card */}
                    <Card className="p-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-primary p-0.5">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img className="h-full w-full rounded-full object-cover border-4 border-white dark:border-[#151e2b]" src={client.logo} alt={client.name} />
                                </div>
                                <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 border-2 border-white dark:border-[#151e2b] rounded-full" title="Active"></div>
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{client.name}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{client.industry} • {client.location}</p>
                            <div className="mt-4 flex space-x-3">
                                <SocialButton icon={Linkedin} />
                                <SocialButton icon={Globe} />
                            </div>
                        </div>
                        <hr className="my-6 border-slate-100 dark:border-slate-700" />
                        {/* Key Contact */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Primary Contact</h3>
                            <div className="flex items-start space-x-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className="h-10 w-10 rounded-full object-cover" src={client.contact.avatar} alt={client.contact.name} />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{client.contact.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{client.contact.role}</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-3">
                                <ContactItem icon={Mail} value={client.contact.email} />
                                <ContactItem icon={Phone} value={client.contact.phone} />
                            </div>
                        </div>
                    </Card>

                    {/* Website Preview */}
                    <Card className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Website Preview</h3>
                            <a href="#" className="text-xs text-primary hover:text-blue-400 flex items-center">
                                Visit Site <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                        </div>
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcBKNWs567Zi-3nwbExVw3M3Tof5mT_e3UeGPtPxlEtgiQqvUUU1RooUWwOIhzzkMabxqUnUDm1BzJ_9Mk3DvQOO1Y6YaQK-Et_JeGxvas7odAFstn4fcJ19-qMjmlIlU8Hxqk4icCAPk7nSDURrkV7_DSLPi0ff3KITLMaIvI19QNJajPb-6gcmeHXROYfxNSPO3g6nreQle3nQSdBmKPRIFML3BUW84pM_53SmubD9akYHlQ5gSnrrqQslT_O3lzmEXbqgS_bvzN" alt="Website Preview" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Last crawled: 2 days ago</span>
                            </div>
                        </div>
                    </Card>

                    {/* Tags */}
                    <Card className="p-4">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Lead Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {client.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                                    {tag}
                                </Badge>
                            ))}
                            <button className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-transparent border border-dashed border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-600 dark:border-slate-600 dark:text-slate-400 dark:hover:text-slate-300 transition-colors">
                                + Add Tag
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                    {/* AI Intelligence Card */}
                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="flex-shrink-0 flex flex-col items-center">
                                <div className="relative h-32 w-32 flex items-center justify-center">
                                    {/* Simple SVG Gauge */}
                                    <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path className="text-slate-100 dark:text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                        <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeLinecap="round" strokeWidth="3" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{client.score}</span>
                                        <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wide">Lead Score</span>
                                    </div>
                                </div>
                                <span className="mt-2 text-sm font-medium text-primary">High Intent</span>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="text-primary w-5 h-5" />
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ideanix AI Insights</h3>
                                </div>
                                <div className="space-y-3">
                                    <InsightItem color="bg-green-500" text={<span>Company recently raised <span className="font-semibold text-slate-900 dark:text-white">$25M Series B funding</span>, indicating budget availability.</span>} />
                                    <InsightItem color="bg-green-500" text={<span>Hiring aggressively for <span className="font-semibold text-slate-900 dark:text-white">DevOps roles</span> over the last 30 days (+5 open positions).</span>} />
                                    <InsightItem color="bg-yellow-500" text="CTO Sarah Jenkins posted about 'Scaling infrastructure challenges' on LinkedIn 2 days ago." />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Tabs & Activity */}
                    <Card className="min-h-[500px] flex flex-col p-0">
                        <Tabs defaultValue="activity" className="w-full flex-1 flex flex-col">
                            <div className="border-b border-slate-200 dark:border-slate-700 px-6">
                                <TabsList className="h-14 bg-transparent p-0 space-x-6">
                                    <TabItem value="activity" icon={History} label="Activity History" />
                                    <TabItem value="notes" icon={StickyNote} label="Notes" count={2} />
                                    <TabItem value="emails" icon={Mail} label="Emails" />
                                </TabsList>
                            </div>

                            <div className="p-6 flex-grow bg-slate-50/50 dark:bg-transparent">
                                <TabsContent value="activity" className="mt-0 h-full flex flex-col">
                                    {/* Note Input */}
                                    <div className="mb-8 bg-white dark:bg-[#151e2b] rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Add a note</label>
                                            <div className="flex space-x-1">
                                                <IconButton icon={Bold} />
                                                <IconButton icon={Italic} />
                                                <IconButton icon={List} />
                                            </div>
                                        </div>
                                        <textarea className="w-full bg-transparent border-0 focus:ring-0 p-0 text-sm min-h-[80px] resize-none placeholder:text-slate-400" placeholder="Jot down something specific about this lead..." />
                                        <div className="mt-2 flex justify-end border-t border-slate-100 dark:border-slate-700 pt-2">
                                            <Button size="sm" className="h-7 text-xs">Save Note</Button>
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    <div className="flow-root relative pl-2">
                                        <div className="absolute top-0 left-8 h-full w-px bg-slate-200 dark:bg-slate-700 -z-10"></div>
                                        <ul className="space-y-8">
                                            <TimelineItem
                                                icon={CheckCircle2} iconBg="bg-blue-100 dark:bg-blue-900/30" iconColor="text-primary"
                                                title={<span>Status changed to <span className="font-medium text-slate-900 dark:text-white">Qualified</span> by <span className="font-medium">System</span></span>}
                                                desc="Automated based on Funding Alert"
                                                time="Today, 10:00 AM"
                                            />
                                            <TimelineItem
                                                icon={FileText} iconBg="bg-slate-100 dark:bg-slate-800" iconColor="text-slate-500"
                                                title={<span>Note added by <span className="font-medium text-slate-900 dark:text-white">Alex User</span></span>}
                                                content="Met Sarah at SaaS Conf last week. She mentioned they are unhappy with their current CI/CD pipeline speed. Interested in our API integration specifically."
                                                time="Yesterday, 4:15 PM"
                                            />
                                            <TimelineItem
                                                icon={Download} iconBg="bg-purple-100 dark:bg-purple-900/30" iconColor="text-purple-600 dark:text-purple-400"
                                                title={<span>Lead Scraped from <span className="font-medium text-slate-900 dark:text-white">LinkedIn Sales Navigator</span></span>}
                                                time="Yesterday, 2:30 PM"
                                            />
                                        </ul>
                                    </div>
                                </TabsContent>
                                <TabsContent value="notes">
                                    <div className="text-center text-slate-500 py-10">Notes content placeholder</div>
                                </TabsContent>
                                <TabsContent value="emails">
                                    <div className="text-center text-slate-500 py-10">Emails content placeholder</div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function SocialButton({ icon: Icon }: any) {
    return (
        <a href="#" className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors">
            <Icon className="w-5 h-5" />
        </a>
    )
}

function ContactItem({ icon: Icon, value }: any) {
    return (
        <div className="group flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-colors cursor-pointer">
            <div className="flex items-center min-w-0">
                <Icon className="text-slate-400 w-4 h-4 mr-2" />
                <span className="text-sm text-slate-600 dark:text-slate-300 truncate">{value}</span>
            </div>
            <Copy className="text-slate-400 w-3 h-3 opacity-0 group-hover:opacity-100" />
        </div>
    )
}

function InsightItem({ color, text }: any) {
    return (
        <div className="flex items-start gap-3">
            <div className={`mt-1.5 h-1.5 w-1.5 rounded-full ${color} flex-shrink-0`}></div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{text}</p>
        </div>
    )
}

function TabItem({ value, icon: Icon, label, count }: any) {
    return (
        <TabsTrigger
            value={value}
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-1 py-4 h-auto"
        >
            <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {count && <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 py-0.5 px-2 rounded-full text-xs">{count}</span>}
            </div>
        </TabsTrigger>
    )
}

function IconButton({ icon: Icon }: any) {
    return (
        <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded">
            <Icon className="w-4 h-4" />
        </button>
    )
}

function TimelineItem({ icon: Icon, iconBg, iconColor, title, desc, content, time }: any) {
    return (
        <li className="relative pb-4">
            <div className="relative flex space-x-3">
                <div>
                    <span className={`h-12 w-12 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-[#1a2433] ${iconBg}`}>
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                    </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
                        {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
                        {content && (
                            <div className="mt-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#101722] p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                <p>{content}</p>
                            </div>
                        )}
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-slate-500 dark:text-slate-400">
                        <time>{time}</time>
                    </div>
                </div>
            </div>
        </li>
    )
}
