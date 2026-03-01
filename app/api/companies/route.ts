import { createClient } from '@/lib/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = createClient()

    const { data: companies, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(companies)
}

export async function POST(request: Request) {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase
        .from('companies')
        .insert(body)
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}
