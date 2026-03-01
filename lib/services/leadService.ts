
import { supabase } from '@/lib/supabaseClient'
import { Database } from '@/types/database'

export type Lead = Database['public']['Tables']['leads']['Row']
export type NewLead = Database['public']['Tables']['leads']['Insert']
export type UpdateLead = Database['public']['Tables']['leads']['Update']

export const leadService = {
    getLeads: async (): Promise<Lead[]> => {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    },

    getLead: async (id: string): Promise<Lead | undefined> => {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('id', id)
            .single()

        if (error) return undefined
        return data
    },

    createLead: async (lead: NewLead): Promise<Lead> => {
        const { data, error } = await supabase
            .from('leads')
            .insert(lead)
            .select()
            .single()

        if (error) throw error
        return data
    },

    updateLead: async (id: string, updates: UpdateLead): Promise<Lead> => {
        const { data, error } = await supabase
            .from('leads')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    deleteLead: async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
