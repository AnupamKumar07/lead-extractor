import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ApiKey {
    id: string
    name: string
    prefix: string
    created: string
    lastUsed: string
}

export interface Proxy {
    id: number
    ip: string
    port: number
    status: 'active' | 'testing' | 'dead'
    location: string
}

interface SettingsState {
    apiKeys: ApiKey[]
    proxies: Proxy[]
    scraperConfig: {
        deepCrawling: boolean
        aiEnrichment: boolean
        requestThrottling: number
    }

    // Actions
    addApiKey: (name: string) => void
    revokeApiKey: (id: string) => void
    addProxy: (proxy: Omit<Proxy, 'id' | 'status' | 'location'>) => Promise<void>
    deleteProxy: (id: number) => void
    updateScraperConfig: (config: Partial<SettingsState['scraperConfig']>) => void
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            apiKeys: [
                { id: '1', name: 'Production Service', prefix: 'idx_live_•••••••', created: 'Oct 24, 2023', lastUsed: 'Just now' },
                { id: '2', name: 'Staging / Test', prefix: 'idx_test_•••••••', created: 'Nov 02, 2023', lastUsed: '2 days ago' }
            ],
            proxies: [
                { id: 1, ip: "192.168.1.101", port: 8080, status: "active", location: "US-East" },
                { id: 2, ip: "10.0.0.15", port: 3128, status: "active", location: "EU-West" },
                { id: 3, ip: "172.16.5.99", port: 8000, status: "dead", location: "Asia-South" },
            ],
            scraperConfig: {
                deepCrawling: true,
                aiEnrichment: false,
                requestThrottling: 25
            },

            addApiKey: (name) => set((state) => ({
                apiKeys: [...state.apiKeys, {
                    id: Date.now().toString(),
                    name,
                    prefix: `idx_${Math.random().toString(36).substring(7)}_•••••••`,
                    created: 'Just now',
                    lastUsed: 'Never'
                }]
            })),

            revokeApiKey: (id) => set((state) => ({
                apiKeys: state.apiKeys.filter((k) => k.id !== id)
            })),

            addProxy: async (proxyData) => {
                const newProxy: Proxy = {
                    ...proxyData,
                    id: Date.now(),
                    status: 'testing',
                    location: 'Unknown'
                }

                set((state) => ({ proxies: [...state.proxies, newProxy] }))

                // Simulate testing
                await new Promise(resolve => setTimeout(resolve, 1500))

                set((state) => ({
                    proxies: state.proxies.map(p =>
                        p.id === newProxy.id
                            ? { ...p, status: 'active', location: 'US-Central' }
                            : p
                    )
                }))
            },

            deleteProxy: (id) => set((state) => ({
                proxies: state.proxies.filter((p) => p.id !== id)
            })),

            updateScraperConfig: (config) => set((state) => ({
                scraperConfig: { ...state.scraperConfig, ...config }
            }))
        }),
        {
            name: 'settings-storage',
        }
    )
)
