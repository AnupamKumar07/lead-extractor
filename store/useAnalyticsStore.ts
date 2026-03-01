import { create } from 'zustand'
import { analyticsService } from '@/lib/services/analyticsService'

interface AnalyticsState {
    stats: any
    charts: any
    isLoading: boolean
    error: string | null

    fetchAnalytics: () => Promise<void>
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
    stats: null,
    charts: null,
    isLoading: false,
    error: null,

    fetchAnalytics: async () => {
        set({ isLoading: true, error: null })
        try {
            const [stats, charts] = await Promise.all([
                analyticsService.getDashboardStats(),
                analyticsService.getAnalyticsData()
            ])
            set({ stats, charts, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    }
}))
