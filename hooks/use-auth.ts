import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'
import { authService } from '@/lib/services/authService'

interface AuthState {
    user: User | null
    isLoading: boolean
    checkUser: () => Promise<void>
    signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    checkUser: async () => {
        set({ isLoading: true })
        try {
            const { user } = await authService.getCurrentUser()
            set({ user, isLoading: false })
        } catch (error) {
            set({ user: null, isLoading: false })
        }
    },
    signOut: async () => {
        await authService.signOut()
        set({ user: null })
    }
}))

// Initialize auth listener
supabase.auth.onAuthStateChange((event, session) => {
    useAuth.setState({
        user: session?.user ?? null,
        isLoading: false
    })
})
