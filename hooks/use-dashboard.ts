import { create } from 'zustand'

interface DashboardState {
    isSidebarOpen: boolean
    toggleSidebar: () => void
    closeSidebar: () => void
}

export const useDashboard = create<DashboardState>((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    closeSidebar: () => set({ isSidebarOpen: false })
}))
