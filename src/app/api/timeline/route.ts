import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { TimelineEvent } from '@/lib/models'

// GET all timeline events
export async function GET() {
    try {
        await dbConnect()
        const events = await TimelineEvent.find({}).sort({ order: 1 })
        return NextResponse.json(events)
    } catch (error) {
        console.error('Error fetching timeline events:', error)
        return NextResponse.json(
            { error: 'Failed to fetch timeline events' },
            { status: 500 }
        )
    }
}

// POST create new timeline event
export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()

        // Get the highest order number
        const lastEvent = await TimelineEvent.findOne({}).sort({ order: -1 })
        const newOrder = lastEvent ? lastEvent.order + 1 : 0

        const event = await TimelineEvent.create({
            ...body,
            order: body.order ?? newOrder,
        })

        return NextResponse.json(event, { status: 201 })
    } catch (error) {
        console.error('Error creating timeline event:', error)
        return NextResponse.json(
            { error: 'Failed to create timeline event' },
            { status: 500 }
        )
    }
}
