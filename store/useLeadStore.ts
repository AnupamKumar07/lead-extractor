import { create } from 'zustand'
import { leadService, Lead } from '@/lib/services/leadService'

interface LeadState {
    leads: Lead[]
    isLoading: boolean
    error: string | null
    filters: {
        status: string
        search: string
    }

    // Actions
    fetchLeads: () => Promise<void>
    addLead: (lead: Omit<Lead, 'id' | 'created_at' | 'lead_score'>) => Promise<void>
    updateLead: (id: string, updates: Partial<Lead>) => Promise<void>
    deleteLead: (id: string) => Promise<void>
    setFilters: (filters: Partial<LeadState['filters']>) => void

    // Computed (via simple getters in components or separate selectors if complex)
}

export const useLeadStore = create<LeadState>((set, get) => ({
    leads: [],
    isLoading: false,
    error: null,
    filters: {
        status: 'all',
        search: ''
    },

    fetchLeads: async () => {
        set({ isLoading: true, error: null })
        try {
            const leads = await leadService.getLeads()
            set({ leads, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    addLead: async (leadData) => {
        // Optimistic update could go here, but for now we wait for "instant" mock
        set({ isLoading: true, error: null })
        try {
            const newLead = await leadService.createLead(leadData)
            set((state) => ({
                leads: [newLead, ...state.leads],
                isLoading: false
            }))
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    updateLead: async (id, updates) => {
        // Optimistic update
        set((state) => ({
            leads: state.leads.map(l => l.id === id ? { ...l, ...updates } : l)
        }))

        try {
            await leadService.updateLead(id, updates)
        } catch (error: any) {
            // Revert on failure (simplified)
            set({ error: error.message })
            get().fetchLeads()
        }
    },

    deleteLead: async (id) => {
        // Optimistic update
        const previousLeads = get().leads
        set((state) => ({
            leads: state.leads.filter(l => l.id !== id)
        }))

        try {
            await leadService.deleteLead(id)
        } catch (error: any) {
            set({ error: error.message, leads: previousLeads })
        }
    },

    setFilters: (newFilters) => {
        set((state) => ({
            filters: { ...state.filters, ...newFilters }
        }))
    }
}))
