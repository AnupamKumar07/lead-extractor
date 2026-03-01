export type UserRole = 'ADMIN' | 'INTERN' | 'USER'

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    avatar?: string
}

export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface NavItem {
    title: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    active?: boolean
}

export interface DashboardStat {
    label: string
    value: string | number
    change?: number
    trend?: 'up' | 'down' | 'neutral'
}
