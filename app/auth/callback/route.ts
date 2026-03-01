import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return [] // Not needed for callback
                    },
                    setAll(cookiesToSet) {
                        // Handled by the redirect response
                    },
                },
            }
        )

        // We need to create a cookie store that can be modified
        const cookieStore = new Map()

        const supabaseServer = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        // @ts-ignore
                        return Array.from(cookieStore.entries()).map(([name, value]) => ({ name, value }))
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value)
                        })
                    },
                },
            }
        )

        const { error } = await supabaseServer.auth.exchangeCodeForSession(code)

        if (!error) {
            const response = NextResponse.redirect(`${origin}${next}`)
            // Copy cookies from the temporary store to the response
            // @ts-ignore
            cookieStore.forEach((value, name) => {
                response.cookies.set(name, value)
            })

            return response
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
