import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // Return mock status
    return NextResponse.json({
        status: 'idle', // 'running', 'idle', 'error'
        uptime: 0,
        activeJob: null
    })
}
