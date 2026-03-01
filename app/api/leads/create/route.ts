import { createClient } from '@/lib/supabaseClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = createClient()

    try {
        const body = await request.json()
        const { name, website, email, phone, industry, location, firstName, lastName, jobTitle } = body

        // 1. Validate required fields
        if (!name) {
            return NextResponse.json({ error: 'Company Name is required' }, { status: 400 })
        }

        // 2. Check if company exists or create it
        // We'll search by name for now. Ideally domain/website checking is better but name is required.
        let companyId: string | null = null;

        const { data: existingCompany, error: searchError } = await supabase
            .from('companies')
            .select('id')
            .eq('name', name)
            .single()

        if (existingCompany) {
            companyId = existingCompany.id
            // Optional: Update existing company with new details if provided? 
            // For now, we'll just link to it to avoid overwriting data without confirmation.
        } else {
            // Create new company
            const { data: newCompany, error: createError } = await supabase
                .from('companies')
                .insert({
                    name,
                    website,
                    email,
                    phone,
                    industry,
                    location,
                    // created_at will be auto-handled if default is set, otherwise default to now?
                    // Supabase usually handles created_at default now()
                })
                .select('id')
                .single()

            if (createError) {
                console.error('Error creating company:', createError)
                return NextResponse.json({ error: 'Failed to create company: ' + createError.message }, { status: 500 })
            }
            companyId = newCompany.id
        }

        // 3. Create Lead
        if (!companyId) {
            return NextResponse.json({ error: 'Failed to resolve company ID' }, { status: 500 })
        }

        const { data: newLead, error: leadError } = await supabase
            .from('leads')
            .insert({
                company_id: companyId,
                first_name: firstName || null,
                last_name: lastName || null,
                job_title: jobTitle || null,
                email: email, // Associate provided email with lead as well
                status: 'New', // Default status
                source: 'Manual', // Source is manual entry
            })
            .select()
            .single()

        if (leadError) {
            console.error('Error creating lead:', leadError)
            return NextResponse.json({ error: 'Failed to create lead: ' + leadError.message }, { status: 500 })
        }

        return NextResponse.json(newLead)

    } catch (e: any) {
        console.error('Unexpected error:', e)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
