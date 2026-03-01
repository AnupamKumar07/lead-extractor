import { createClient } from '@/lib/supabaseClient'

export async function getDashboardStats() {
    const supabase = createClient()

    const [
        { count: totalLeads },
        { count: qualifiedLeads },
        { count: contactedLeads },
        { count: convertedLeads },
        { count: highValueLeads },
        { data: recentLeads }
    ] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'qualified'),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'contacted'),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'converted'),
        supabase.from('leads').select('*', { count: 'exact', head: true }).gt('lead_score', 80),
        supabase.from('leads').select('*, companies(*)').order('created_at', { ascending: false }).limit(5)
    ])

    const total = totalLeads || 0
    const conversionRate = total > 0 ? (((convertedLeads || 0) / total) * 100).toFixed(1) + '%' : '0%'

    return {
        totalLeads: total,
        qualifiedLeads: qualifiedLeads || 0,
        contactedLeads: contactedLeads || 0,
        highValueLeads: highValueLeads || 0,
        conversionRate,
        recentLeads: recentLeads || []
    }
}
