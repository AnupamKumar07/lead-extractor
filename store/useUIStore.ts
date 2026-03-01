import { create } from 'zustand'

interface UIState {
    isSidebarOpen: boolean
    activeModal: string | null
    theme: 'light' | 'dark'

    toggleSidebar: () => void
    openModal: (modalId: string) => void
    closeModal: () => void
    setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIState>((set) => ({
    isSidebarOpen: true, // Default open on desktop
    activeModal: null,
    theme: 'light',

    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    openModal: (modalId) => set({ activeModal: modalId }),
    closeModal: () => set({ activeModal: null }),
    setTheme: (theme) => set({ theme })
}))
