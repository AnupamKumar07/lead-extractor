import { createClient } from '@/lib/supabaseClient'
import { NextResponse } from 'next/server'
import { LeadService } from '@/services/lead.service'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = createClient()
    const { id } = await params

    const { data: lead, error } = await supabase
        .from('leads')
        .select('*, companies(*)')
        .eq('id', id)
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(lead)
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = createClient()
    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase
        .from('leads')
        .update(body)
        .eq('id', id)
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const response = await LeadService.deleteLead(id)

    if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
