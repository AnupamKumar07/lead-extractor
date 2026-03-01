import { createClient } from '@/lib/supabaseClient'

interface GoogleMapsParams {
    query: string
    lat?: number
    lng?: number
    zoom?: number
}

export async function scrapeGoogleMaps(params: GoogleMapsParams) {
    // This would typically interface with an Apify actor or similar service
    // For now, we'll set up the structure to call the endpoint

    const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN
    const ACTOR_ID = 'nw8e5gX52f54Z53' // Example Actor ID for Google Maps Scraper

    if (!APIFY_API_TOKEN) {
        throw new Error('APIFY_API_TOKEN is not set')
    }

    const response = await fetch(`https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${APIFY_API_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            searchStringsArray: [params.query],
            locationQuery: '',
            maxCrawledPlaces: 10, // Default limit
            language: 'en',
        }),
    })

    if (!response.ok) {
        throw new Error(`Failed to start scraper: ${response.statusText}`)
    }

    const run = await response.json()
    const datasetId = run.data.defaultDatasetId

    // Polling for results or webhook implementation would go here
    // For this initial setup, we return the run ID and dataset ID

    return {
        runId: run.data.id,
        datasetId: datasetId,
        status: 'started'
    }
}

export async function storeGoogleMapsResults(datasetId: string) {
    const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN
    const supabase = createClient()

    if (!APIFY_API_TOKEN) {
        throw new Error('APIFY_API_TOKEN is not set')
    }

    const response = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_API_TOKEN}`)

    if (!response.ok) {
        throw new Error(`Failed to fetch results: ${response.statusText}`)
    }

    const results = await response.json()

    // Transform and store in Supabase
    for (const place of results) {
        const company = {
            name: place.title,
            website: place.website,
            phone: place.phone,
            location: place.address,
            industry: place.categoryName,
        }

        const { data: insertedCompany, error } = await supabase
            .from('companies')
            .upsert(company, { onConflict: 'website' }) // Assuming website is unique enough for now
            .select()
            .single()

        if (error) {
            console.error('Error storing company:', error)
            continue
        }

        // Setup initial lead data if needed
    }

    return { success: true, count: results.length }
}
