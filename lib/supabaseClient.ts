import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Use fallback mock values so the build doesn't fail when missing env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key-1234'

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

export const createClient = () => {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
