import { create } from 'zustand'
import { companyService, Company } from '@/lib/services/companyService'

interface CompanyState {
    companies: Company[]
    isLoading: boolean
    error: string | null

    fetchCompanies: () => Promise<void>
    addCompany: (company: Omit<Company, 'id' | 'created_at'>) => Promise<void>
    updateCompany: (id: string, updates: Partial<Company>) => Promise<void>
    deleteCompany: (id: string) => Promise<void>
}

export const useCompanyStore = create<CompanyState>((set, get) => ({
    companies: [],
    isLoading: false,
    error: null,

    fetchCompanies: async () => {
        set({ isLoading: true, error: null })
        try {
            const companies = await companyService.getCompanies()
            set({ companies, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    addCompany: async (companyData) => {
        set({ isLoading: true, error: null })
        try {
            const newCompany = await companyService.createCompany(companyData)
            set((state) => ({
                companies: [newCompany, ...state.companies],
                isLoading: false
            }))
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    updateCompany: async (id: string, updates: Partial<Company>) => {
        set((state) => ({
            companies: state.companies.map(c => c.id === id ? { ...c, ...updates } : c)
        }))
        try {
            await companyService.updateCompany(id, updates)
        } catch (error: any) {
            set({ error: error.message })
            get().fetchCompanies()
        }
    },

    deleteCompany: async (id: string) => {
        const previousCompanies = get().companies
        set((state) => ({
            companies: state.companies.filter(c => c.id !== id)
        }))
        try {
            await companyService.deleteCompany(id)
        } catch (error: any) {
            set({ error: error.message, companies: previousCompanies })
        }
    }
}))
