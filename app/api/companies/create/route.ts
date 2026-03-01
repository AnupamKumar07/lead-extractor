import { createClient } from '@/lib/supabaseClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = createClient()

    try {
        const body = await request.json()
        const { name, website, email, phone, industry, location } = body

        if (!name) {
            return NextResponse.json({ error: 'Company Name is required' }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('companies')
            .insert({
                name,
                website,
                email,
                phone,
                industry,
                location
            })
            .select()
            .single()

        if (error) {
            console.error('Error creating company:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)

    } catch (e: any) {
        console.error('Unexpected error:', e)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
