import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Ideally this should be server-side only
})

interface CompanyData {
    name: string
    industry: string
    website?: string
    description?: string
    employees?: number
    location?: string
}

export async function analyzeLead(companyData: CompanyData) {
    if (!process.env.OPENAI_API_KEY) {
        console.warn('OPENAI_API_KEY is not set')
        // Return mock score if no key
        return {
            lead_score: 50,
            website_score: 50,
            tech_score: 50,
            ai_score: 50,
            analysis: 'API Key missing. Returning default scores.'
        }
    }

    const prompt = `
    Analyze the following company as a potential sales lead.
    Company Name: ${companyData.name}
    Industry: ${companyData.industry}
    Website: ${companyData.website || 'N/A'}
    Location: ${companyData.location || 'N/A'}
    Description: ${companyData.description || 'N/A'}

    Provide a JSON response with the following fields:
    - lead_score: (0-100) Overall potential as a lead
    - website_score: (0-100) Quality of online presence (inferred)
    - tech_score: (0-100) Likelihood of being tech-savvy (inferred)
    - ai_score: (0-100) Suitability for AI solutions
    - analysis: A brief 2-sentence explanation of the score.
  `

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'You are an expert sales analyst specializing in B2B lead scoring. Respond ONLY with valid JSON.' },
                { role: 'user', content: prompt }
            ],
            response_format: { type: "json_object" }
        })

        const content = response.choices[0].message.content
        if (!content) {
            throw new Error('Empty response from OpenAI')
        }

        return JSON.parse(content)

    } catch (error) {
        console.error('Error in analyzeLead:', error)
        return {
            lead_score: 0,
            website_score: 0,
            tech_score: 0,
            ai_score: 0,
            analysis: 'Error analyzing lead.'
        }
    }
}
