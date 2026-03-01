import { createClient } from '@/lib/supabaseClient'

interface ApolloParams {
    domain: string
}

export async function scrapeApollo(params: ApolloParams) {
    const API_KEY = process.env.APOLLO_API_KEY
    if (!API_KEY) {
        throw new Error('APOLLO_API_KEY is not set')
    }

    const response = await fetch('https://api.apollo.io/v1/organizations/enrich', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
            api_key: API_KEY,
            domain: params.domain
        })
    })

    if (!response.ok) {
        throw new Error(`Apollo enrichment failed: ${response.statusText}`)
    }

    const data = await response.json()
    const org = data.organization

    if (!org) {
        return null
    }

    // Store/Update Company in Supabase
    const supabase = createClient()

    const companyData = {
        name: org.name,
        website: org.website_url,
        linkedin_url: org.linkedin_url,
        location: org.city + ', ' + org.country,
        industry: org.industry,
        founded_year: org.founded_year,
        // ... map other fields
    }

    const { data: savedCompany, error } = await supabase
        .from('companies')
        .upsert(companyData, { onConflict: 'website' })
        .select()
        .single()

    if (error) {
        console.error('Error saving Apollo data:', error)
        throw error
    }

    return savedCompany
}
