
import { supabase } from '@/lib/supabaseClient'
import { Database } from '@/types/database'

export type Company = Database['public']['Tables']['companies']['Row']
export type NewCompany = Database['public']['Tables']['companies']['Insert']
export type UpdateCompany = Database['public']['Tables']['companies']['Update']

export const companyService = {
    getCompanies: async (): Promise<Company[]> => {
        const { data, error } = await supabase
            .from('companies')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    },

    getCompany: async (id: string): Promise<Company | undefined> => {
        const { data, error } = await supabase
            .from('companies')
            .select('*')
            .eq('id', id)
            .single()

        if (error) return undefined
        return data
    },

    createCompany: async (company: NewCompany): Promise<Company> => {
        const { data, error } = await supabase
            .from('companies')
            .insert(company)
            .select()
            .single()

        if (error) throw error
        return data
    },

    updateCompany: async (id: string, updates: UpdateCompany): Promise<Company> => {
        const { data, error } = await supabase
            .from('companies')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    deleteCompany: async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('companies')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
