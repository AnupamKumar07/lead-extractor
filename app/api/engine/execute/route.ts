import { createClient } from '@/lib/supabaseClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { source, query } = await request.json()
        const supabase = createClient()

        // Mocking the scraper execution for now as real scraping usually takes time
        // In a real app, this would trigger a background job (e.g. BullMQ, Inngest)

        // Simulate finding a lead
        const mockLead = {
            first_name: "Alex",
            last_name: "Chen",
            email: `alex.chen.${Date.now()}@example.com`,
            job_title: "CTO",
            company_name: "Innovate AI",
            source: source || "manual",
            status: "new",
            lead_score: 85
        }

        // 1. Create Company
        const { data: company, error: companyError } = await supabase
            .from('companies')
            .insert([{ name: mockLead.company_name, source: source }])
            .select()
            .single()

        if (companyError && companyError.code !== '23505') { // Ignore duplicate error
            console.error("Company creation error", companyError)
        }

        // 2. Create Lead
        const { data: lead, error: leadError } = await supabase
            .from('leads')
            .insert([{
                first_name: mockLead.first_name,
                last_name: mockLead.last_name,
                email: mockLead.email,
                job_title: mockLead.job_title,
                company_id: company?.id,
                source: mockLead.source,
                status: mockLead.status,
                lead_score: mockLead.lead_score
            }])
            .select()

        return NextResponse.json({
            success: true,
            message: "Scraping cycle initiated successfully",
            data: { lead, company }
        })

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to execute engine' }, { status: 500 })
    }
}
