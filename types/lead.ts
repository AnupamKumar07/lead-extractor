export interface Lead {
    id: string
    company_id?: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
    phone: string | null
    job_title: string | null

    status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost'
    source: string | null
    linkedin_url: string | null
    notes: string | null

    // Intelligence Fields
    lead_score: number | null
    opportunity_score: number | null
    data_confidence_score: number | null
    trend_alignment_score: number | null
    deal_potential_estimate: string | null
    risk_flag: 'Low' | 'Medium' | 'High' | null
    freshness_tag: 'Recently Updated' | '1-6 Months' | 'Outdated' | null
    engagement_status: string | null

    smart_tags: string[] | null
    intent_signals: any[] | null

    created_at: string
    updated_at: string

    company?: string // Optional joined compat
    location?: string // Optional joined compat
}
