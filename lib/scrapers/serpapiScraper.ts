import { createClient } from '@/lib/supabaseClient'

interface SerpApiParams {
    query: string
    location?: string
}

export async function scrapeSerpApi(params: SerpApiParams) {
    const API_KEY = process.env.SERPAPI_API_KEY
    if (!API_KEY) {
        throw new Error('SERPAPI_API_KEY is not set')
    }

    const url = new URL('https://serpapi.com/search')
    url.searchParams.append('api_key', API_KEY)
    url.searchParams.append('q', params.query)
    if (params.location) {
        url.searchParams.append('location', params.location)
    }
    url.searchParams.append('engine', 'google')

    const response = await fetch(url.toString())

    if (!response.ok) {
        throw new Error(`SerpAPI search failed: ${response.statusText}`)
    }

    const data = await response.json()

    // Process organic results
    const results = data.organic_results || []
    const processed = []

    const supabase = createClient()

    for (const result of results) {
        // Extract potential company data
        const item = {
            title: result.title,
            link: result.link,
            snippet: result.snippet,
        }

        // Here we could implement some logic to identify if this is a company and store it
        // For now, we return the raw results
        processed.push(item)
    }

    return processed
}
