import { supabase } from '@/lib/supabaseClient'

export const analyticsService = {
  getDashboardStats: async () => {
    try {

      // Fetch all leads directly
      const { data: leads, error } = await supabase
        .from('leads')
        .select('*')

      if (error) {
        console.error('Error fetching leads:', error)
        return null
      }

      const totalLeads = leads?.length || 0

      const qualifiedLeads =
        leads?.filter((l) => l.status === 'Qualified').length || 0

      const contactedLeads =
        leads?.filter((l) => l.status === 'Contacted').length || 0

      const convertedLeads =
        leads?.filter((l) => l.status === 'Converted').length || 0

      const conversionRate =
        totalLeads > 0
          ? ((convertedLeads / totalLeads) * 100).toFixed(1) + '%'
          : '0%'

      // Recent leads
      const recentLeads = leads
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)

      return {
        metrics: {
          totalLeads: {
            value: totalLeads,
            trend: "+0%",
            trendUp: true,
            color: "blue"
          },
          qualifiedLeads: {
            value: qualifiedLeads,
            trend: "+0%",
            trendUp: true,
            color: "emerald"
          },
          contactedLeads: {
            value: contactedLeads,
            trend: "0%",
            trendUp: "neutral",
            color: "blue"
          },
          convertedLeads: {
            value: convertedLeads,
            trend: "+0%",
            trendUp: true,
            color: "green"
          },
          highValueLeads: {
            value: 0,
            trend: "+0%",
            trendUp: true,
            color: "purple"
          },
          conversionRate: {
            value: conversionRate,
            trend: "0%",
            trendUp: false,
            color: "blue"
          },
          pipelineRevenue: {
            value: "$0",
            trend: "+0%",
            trendUp: true,
            color: "amber"
          }
        },
        recentLeads: recentLeads || [],
        activityFeed: []
      }

    } catch (err) {
      console.error('Unhandled error in getDashboardStats:', err)

      return {
        metrics: {
          totalLeads: { value: 0, trend: "+0%", trendUp: true, color: "blue" },
          qualifiedLeads: { value: 0, trend: "+0%", trendUp: true, color: "emerald" },
          contactedLeads: { value: 0, trend: "0%", trendUp: "neutral", color: "blue" },
          convertedLeads: { value: 0, trend: "+0%", trendUp: true, color: "green" },
          highValueLeads: { value: 0, trend: "+0%", trendUp: true, color: "purple" },
          conversionRate: { value: '0%', trend: "0%", trendUp: false, color: "blue" },
          pipelineRevenue: { value: "$0", trend: "+0%", trendUp: true, color: "amber" }
        },
        recentLeads: [],
        activityFeed: []
      }
    }
  },

  getAnalyticsData: async () => {
    try {

      const { data: sourcesData } = await supabase
        .from('leads')
        .select('source')

      const sourceCounts: Record<string, number> = {}

      sourcesData?.forEach((l) => {
        const s = l.source || 'Unknown'
        sourceCounts[s] = (sourceCounts[s] || 0) + 1
      })

      const sources = Object.entries(sourceCounts).map(([name, value]) => ({
        name,
        value,
        fill: '#0077b5'
      }))

      return {
        leadsOverTime: [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 600 },
          { name: 'Apr', value: 800 },
          { name: 'May', value: 700 },
          { name: 'Jun', value: 900 }
        ],
        pipelineStatus: [
          { name: 'New', value: 400, fill: '#3b82f6' },
          { name: 'Qualified', value: 300, fill: '#8b5cf6' },
          { name: 'Contacted', value: 300, fill: '#f59e0b' },
          { name: 'Converted', value: 200, fill: '#10b981' }
        ],
        sources:
          sources.length > 0
            ? sources
            : [
                { name: 'LinkedIn', value: 45, fill: '#0077b5' },
                { name: 'Website', value: 30, fill: '#8b5cf6' },
                { name: 'Email', value: 15, fill: '#ef4444' },
                { name: 'Referral', value: 10, fill: '#10b981' }
              ]
      }

    } catch (err) {
      console.error('Unhandled error in getAnalyticsData:', err)

      return {
        leadsOverTime: [],
        pipelineStatus: [],
        sources: []
      }
    }
  }
}