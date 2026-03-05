import { createClient } from '@/lib/supabaseClient'

export async function getDashboardStats() {

    const supabase = createClient()

    const { data: leads, error } = await supabase
        .from('leads')
        .select('*')

    if (error) {
        console.error('Error fetching leads:', error)

        return {
            totalLeads: 0,
            qualifiedLeads: 0,
            contactedLeads: 0,
            highValueLeads: 0,
            conversionRate: '0%',
            recentLeads: []
        }
    }

    const totalLeads = leads?.length || 0

    const qualifiedLeads =
        leads?.filter(l => l.status === 'qualified').length || 0

    const contactedLeads =
        leads?.filter(l => l.status === 'contacted').length || 0

    const convertedLeads =
        leads?.filter(l => l.status === 'converted').length || 0

    const highValueLeads =
        leads?.filter(l => l.lead_score > 80).length || 0

    const conversionRate =
        totalLeads > 0
            ? ((convertedLeads / totalLeads) * 100).toFixed(1) + '%'
            : '0%'

    const recentLeads =
        leads
            ?.sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
            .slice(0, 5) || []

    return {
        totalLeads,
        qualifiedLeads,
        contactedLeads,
        highValueLeads,
        conversionRate,
        recentLeads
    }
}