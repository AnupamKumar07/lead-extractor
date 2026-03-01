
import { supabase } from '@/lib/supabaseClient'
import { Database } from '@/types/database'

export type ScraperJob = Database['public']['Tables']['scraper_jobs']['Row']
export type ScraperStatus = 'idle' | 'running' | 'stopping' | 'error'

export interface ScraperStats {
    leadsScraped: number
    successRate: number
    activeProxies: number
    rpm: number
}

export interface ScraperLog {
    id: string
    timestamp: string
    message: string
    level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS'
}

// Mock stats for now as we don't have a specific table for this aggregation
const mockStats: ScraperStats = {
    leadsScraped: 1248,
    successRate: 98.5,
    activeProxies: 45,
    rpm: 120
}

export const scraperService = {
    startScraper: async (config: { source: string, query: string }): Promise<ScraperJob> => {
        const { data, error } = await supabase
            .from('scraper_jobs')
            .insert({
                url: config.query, // Mapping query to url for now
                status: 'running',
                leads_found: 0
            })
            .select()
            .single()

        if (error) throw error
        return data
    },

    stopScraper: async (jobId: string) => {
        const { error } = await supabase
            .from('scraper_jobs')
            .update({ status: 'completed' }) // or 'failed' / 'stopped'
            .eq('id', jobId)

        if (error) throw error
        return { status: 'stopping' }
    },

    getStatus: async () => {
        // Get the most recent active job
        const { data: job } = await supabase
            .from('scraper_jobs')
            .select('*')
            .in('status', ['running', 'pending'])
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

        return {
            active: !!job,
            status: job?.status || 'idle',
            currentJob: job,
            stats: mockStats
        }
    },

    getLogs: async () => {
        // Logs are not yet persisting to DB, return empty or mock
        return []
    }
}
