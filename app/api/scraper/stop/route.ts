import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    // In a real scenario, this would cancel the background job
    return NextResponse.json({
        success: true,
        message: 'Scraper stopped successfully'
    })
}
