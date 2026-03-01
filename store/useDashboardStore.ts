import { create } from 'zustand'
import { Database } from '@/types/supabase'

type DashboardStats = {
    totalLeads: number
    qualifiedLeads: number
    contactedLeads: number
    highValueLeads: number
    conversionRate: string
    recentLeads: any[] // We can refine this type
}

interface DashboardState {
    stats: DashboardStats
    isLoading: boolean
    error: string | null
    setStats: (stats: DashboardStats) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
}

const initialStats: DashboardStats = {
    totalLeads: 0,
    qualifiedLeads: 0,
    contactedLeads: 0,
    highValueLeads: 0,
    conversionRate: "0%",
    recentLeads: []
}

export const useDashboardStore = create<DashboardState>((set) => ({
    stats: initialStats,
    isLoading: false,
    error: null,
    setStats: (stats) => set({ stats }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}))
