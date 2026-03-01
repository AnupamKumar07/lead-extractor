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
            raw_leads: {
                Row: {
                    id: string
                    raw_data: Json
                    source: string
                    processed: boolean | null
                    extracted_email: string | null
                    extracted_linkedin: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    raw_data: Json
                    source: string
                    processed?: boolean | null
                    extracted_email?: string | null
                    extracted_linkedin?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    raw_data?: Json
                    source?: string
                    processed?: boolean | null
                    extracted_email?: string | null
                    extracted_linkedin?: string | null
                    created_at?: string
                }
            }
            raw_companies: {
                Row: {
                    id: string
                    raw_data: Json
                    source: string
                    processed: boolean | null
                    extracted_domain: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    raw_data: Json
                    source: string
                    processed?: boolean | null
                    extracted_domain?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    raw_data?: Json
                    source?: string
                    processed?: boolean | null
                    extracted_domain?: string | null
                    created_at?: string
                }
            }
            raw_news: {
                Row: {
                    id: string
                    raw_data: Json
                    source: string
                    company_domain: string | null
                    processed: boolean | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    raw_data: Json
                    source: string
                    company_domain?: string | null
                    processed?: boolean | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    raw_data?: Json
                    source?: string
                    company_domain?: string | null
                    processed?: boolean | null
                    created_at?: string
                }
            }
            leads: {
                Row: {
                    id: string
                    company_id: string | null
                    first_name: string | null
                    last_name: string | null
                    email: string | null
                    phone: string | null
                    job_title: string | null
                    status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost'
                    source: string | null
                    linkedin_url: string | null
                    notes: string | null
                    lead_score: number | null
                    opportunity_score: number | null
                    data_confidence_score: number | null
                    trend_alignment_score: number | null
                    deal_potential_estimate: string | null
                    risk_flag: 'Low' | 'Medium' | 'High' | null
                    freshness_tag: 'Recently Updated' | '1-6 Months' | 'Outdated' | null
                    engagement_status: string | null
                    smart_tags: Json | null
                    intent_signals: Json | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    company_id?: string | null
                    first_name?: string | null
                    last_name?: string | null
                    email?: string | null
                    phone?: string | null
                    job_title?: string | null
                    status?: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost'
                    source?: string | null
                    linkedin_url?: string | null
                    notes?: string | null
                    lead_score?: number | null
                    opportunity_score?: number | null
                    data_confidence_score?: number | null
                    trend_alignment_score?: number | null
                    deal_potential_estimate?: string | null
                    risk_flag?: 'Low' | 'Medium' | 'High' | null
                    freshness_tag?: 'Recently Updated' | '1-6 Months' | 'Outdated' | null
                    engagement_status?: string | null
                    smart_tags?: Json | null
                    intent_signals?: Json | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    company_id?: string | null
                    first_name?: string | null
                    last_name?: string | null
                    email?: string | null
                    phone?: string | null
                    job_title?: string | null
                    status?: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost'
                    source?: string | null
                    linkedin_url?: string | null
                    notes?: string | null
                    lead_score?: number | null
                    opportunity_score?: number | null
                    data_confidence_score?: number | null
                    trend_alignment_score?: number | null
                    deal_potential_estimate?: string | null
                    risk_flag?: 'Low' | 'Medium' | 'High' | null
                    freshness_tag?: 'Recently Updated' | '1-6 Months' | 'Outdated' | null
                    engagement_status?: string | null
                    smart_tags?: Json | null
                    intent_signals?: Json | null
                    created_at?: string
                    updated_at?: string
                }
            }
            companies: {
                Row: {
                    id: string
                    name: string
                    domain: string | null
                    website: string | null
                    email: string | null
                    phone: string | null
                    industry: string | null
                    location: string | null
                    founded_year: number | null
                    linkedin_url: string | null
                    estimated_company_size: string | null
                    incorporation_date: string | null
                    funding_status: string | null
                    verification_status: string | null
                    description: string | null
                    revenue_range: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    domain?: string | null
                    website?: string | null
                    email?: string | null
                    phone?: string | null
                    industry?: string | null
                    location?: string | null
                    founded_year?: number | null
                    linkedin_url?: string | null
                    estimated_company_size?: string | null
                    incorporation_date?: string | null
                    funding_status?: string | null
                    verification_status?: string | null
                    description?: string | null
                    revenue_range?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    domain?: string | null
                    website?: string | null
                    email?: string | null
                    phone?: string | null
                    industry?: string | null
                    location?: string | null
                    founded_year?: number | null
                    linkedin_url?: string | null
                    estimated_company_size?: string | null
                    incorporation_date?: string | null
                    funding_status?: string | null
                    verification_status?: string | null
                    description?: string | null
                    revenue_range?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            scraper_jobs: {
                Row: {
                    id: string
                    type: string
                    status: string | null
                    url: string | null
                    leads_found: number | null
                    duration: number | null
                    error: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    type: string
                    status?: string | null
                    url?: string | null
                    leads_found?: number | null
                    duration?: number | null
                    error?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    type?: string
                    status?: string | null
                    url?: string | null
                    leads_found?: number | null
                    duration?: number | null
                    error?: string | null
                    created_at?: string
                }
            }
        }
        Views: {
            dashboard_stats: {
                Row: {
                    total_leads: number
                    qualified_leads: number
                    contacted_leads: number
                    converted_leads: number
                    conversion_rate: number
                }
            }
        }
    }
}
