import { NextRequest, NextResponse } from 'next/server'

// POST verify private space password
export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json()

        if (!password) {
            return NextResponse.json(
                { error: 'Password required', authenticated: false },
                { status: 400 }
            )
        }

        // Check against environment variable or default password
        const correctPassword = process.env.PRIVATE_SPACE_PASSWORD || 'ourlove'
        const isValid = password === correctPassword

        return NextResponse.json({ authenticated: isValid })
    } catch (error) {
        console.error('Error verifying password:', error)
        return NextResponse.json(
            { error: 'Authentication failed', authenticated: false },
            { status: 500 }
        )
    }
}
