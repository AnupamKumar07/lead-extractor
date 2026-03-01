
import { supabase } from '@/lib/supabaseClient'

export const authService = {
    async signUp({ email, password, options }: { email: string, password: string, options?: any }) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options,
        })
        return { data, error }
    },

    async signInWithOAuth(provider: 'github' | 'google') {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
        return { data, error }
    },

    async signIn({ email, password }: { email: string, password: string }) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    },

    async signOut() {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser()
        return { user, error }
    },

    async getSession() {
        const { data: { session }, error } = await supabase.auth.getSession()
        return { session, error }
    }
}
