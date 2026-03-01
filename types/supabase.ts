export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string
                    name: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    email: string
                    name?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    name?: string | null
                    created_at?: string
                }
            }
            companies: {
                Row: {
                    id: string
                    name: string
                    website: string | null
                    email: string | null
                    phone: string | null
                    industry: string | null
                    location: string | null
                    founded_year: number | null
                    linkedin_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    website?: string | null
                    email?: string | null
                    phone?: string | null
                    industry?: string | null
                    location?: string | null
                    founded_year?: number | null
                    linkedin_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    website?: string | null
                    email?: string | null
                    phone?: string | null
                    industry?: string | null
                    location?: string | null
                    founded_year?: number | null
                    linkedin_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            leads: {
                Row: {
                    id: string
                    company_id: string | null
                    first_name: string | null
                    last_name: string | null
                    email: string | null
                    job_title: string | null
                    lead_score: number
                    website_score: number
                    tech_score: number
                    ai_score: number
                    status: string
                    source: string | null
                    linkedin_profile: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    company_id?: string | null
                    first_name?: string | null
                    last_name?: string | null
                    email?: string | null
                    job_title?: string | null
                    lead_score?: number
                    website_score?: number
                    tech_score?: number
                    ai_score?: number
                    status?: string
                    source?: string | null
                    linkedin_profile?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    company_id?: string | null
                    first_name?: string | null
                    last_name?: string | null
                    email?: string | null
                    job_title?: string | null
                    lead_score?: number
                    website_score?: number
                    tech_score?: number
                    ai_score?: number
                    status?: string
                    source?: string | null
                    linkedin_profile?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            outreach: {
                Row: {
                    id: string
                    lead_id: string | null
                    type: string
                    status: string
                    subject: string | null
                    content: string | null
                    sent_at: string | null
                    response_received: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    lead_id?: string | null
                    type: string
                    status?: string
                    subject?: string | null
                    content?: string | null
                    sent_at?: string | null
                    response_received?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    lead_id?: string | null
                    type?: string
                    status?: string
                    subject?: string | null
                    content?: string | null
                    sent_at?: string | null
                    response_received?: boolean
                    created_at?: string
                }
            }
            scraper_jobs: {
                Row: {
                    id: string
                    type: string
                    status: string
                    target_query: string | null
                    leads_found: number
                    started_at: string | null
                    completed_at: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    type: string
                    status?: string
                    target_query?: string | null
                    leads_found?: number
                    started_at?: string | null
                    completed_at?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    type?: string
                    status?: string
                    target_query?: string | null
                    leads_found?: number
                    started_at?: string | null
                    completed_at?: string | null
                    created_at?: string
                }
            }
            sources_config: {
                Row: {
                    id: string
                    source_name: string
                    is_enabled: boolean
                    api_key: string | null
                    settings: Json | null
                    updated_at: string
                }
                Insert: {
                    id?: string
                    source_name: string
                    is_enabled?: boolean
                    api_key?: string | null
                    settings?: Json | null
                    updated_at?: string
                }
                Update: {
                    id?: string
                    source_name?: string
                    is_enabled?: boolean
                    api_key?: string | null
                    settings?: Json | null
                    updated_at?: string
                }
            }
            proxies: {
                Row: {
                    id: string
                    ip_address: string
                    port: number
                    username: string | null
                    password: string | null
                    status: string
                    last_checked_at: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    ip_address: string
                    port: number
                    username?: string | null
                    password?: string | null
                    status?: string
                    last_checked_at?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    ip_address?: string
                    port?: number
                    username?: string | null
                    password?: string | null
                    status?: string
                    last_checked_at?: string | null
                    created_at?: string
                }
            }
            analytics_events: {
                Row: {
                    id: string
                    event_type: string
                    properties: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    event_type: string
                    properties?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    event_type?: string
                    properties?: Json | null
                    created_at?: string
                }
            }
        }
    }
}
