import { NextResponse } from 'next/server'
import { LeadService } from '@/services/lead.service'

export async function GET() {
    // In a real app with auth, extract user ID from session.
    const userId = "placeholder-user-id"
    const response = await LeadService.fetchLeadsByUser(userId)

    if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 500 })
    }

    return NextResponse.json(response.data)
}

export async function POST(request: Request) {
    const body = await request.json()
    const response = await LeadService.createLead(body)

    if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 500 })
    }

    return NextResponse.json(response.data)
}
