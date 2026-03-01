import { create } from 'zustand'
import { scraperService, ScraperJob, ScraperLog, ScraperStats } from '@/lib/services/scraperService'

interface ScraperState {
    isRunning: boolean
    activeJob: ScraperJob | null
    logs: ScraperLog[]
    stats: ScraperStats | null
    isLoading: boolean
    error: string | null

    startScraper: (config: any) => Promise<void>
    stopScraper: () => Promise<void>
    fetchStatus: () => Promise<void>
    fetchLogs: () => Promise<void> // In a real app, this might be a subscription
    clearLogs: () => void
}

export const useScraperStore = create<ScraperState>((set, get) => ({
    isRunning: false,
    activeJob: null,
    logs: [],
    stats: null,
    isLoading: false,
    error: null,

    startScraper: async (config) => {
        set({ isLoading: true, error: null })
        try {
            const job = await scraperService.startScraper(config)
            set({
                isRunning: true,
                activeJob: job,
                isLoading: false
            })
            // Fetch logs immediately to show startup sequence
            get().fetchLogs()
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    stopScraper: async () => {
        const { activeJob } = get()
        if (!activeJob) return

        set({ isLoading: true, error: null })
        try {
            await scraperService.stopScraper(activeJob.id)
            set({
                isRunning: false,
                activeJob: null, // Or keep it as completed
                isLoading: false
            })
            get().fetchLogs()
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    fetchStatus: async () => {
        try {
            const status = await scraperService.getStatus()
            set({
                isRunning: status.active,
                activeJob: status.currentJob,
                stats: status.stats
            })
        } catch (error: any) {
            console.error(error)
        }
    },

    fetchLogs: async () => {
        // @ts-ignore - types mismatch on logs for now
        const logs = await scraperService.getLogs()
        set({ logs: logs as any[] })
    },

    clearLogs: () => {
        // scraperService.clearLogs() - Removed from service
        set({ logs: [] })
    }
}))
