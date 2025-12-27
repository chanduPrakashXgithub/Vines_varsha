import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { LoveLetter } from '@/lib/models'

// GET all love letters
export async function GET(request: NextRequest) {
    try {
        await dbConnect()

        const { searchParams } = new URL(request.url)
        const includePrivate = searchParams.get('includePrivate') === 'true'

        const query = includePrivate ? {} : { isPrivate: false }
        const letters = await LoveLetter.find(query).sort({ createdAt: -1 })

        return NextResponse.json(letters)
    } catch (error) {
        console.error('Error fetching love letters:', error)
        return NextResponse.json(
            { error: 'Failed to fetch love letters' },
            { status: 500 }
        )
    }
}

// POST create new love letter
export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()

        const letter = await LoveLetter.create(body)
        return NextResponse.json(letter, { status: 201 })
    } catch (error) {
        console.error('Error creating love letter:', error)
        return NextResponse.json(
            { error: 'Failed to create love letter' },
            { status: 500 }
        )
    }
}
