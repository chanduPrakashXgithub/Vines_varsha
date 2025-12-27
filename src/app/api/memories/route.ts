import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Memory } from '@/lib/models'

// GET all memories
export async function GET(request: NextRequest) {
    try {
        await dbConnect()

        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')
        const favorite = searchParams.get('favorite')

        const query: Record<string, unknown> = {}
        if (type) query.type = type
        if (favorite === 'true') query.isFavorite = true

        const memories = await Memory.find(query).sort({ createdAt: -1 })
        return NextResponse.json(memories)
    } catch (error) {
        console.error('Error fetching memories:', error)
        return NextResponse.json(
            { error: 'Failed to fetch memories' },
            { status: 500 }
        )
    }
}

// POST create new memory with manually provided Cloudinary URL
export async function POST(request: NextRequest) {
    try {
        await dbConnect()

        const body = await request.json()
        const { url, caption, date, poetry, type, thumbnail, tags, isFavorite } = body

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required. Please provide your Cloudinary image/video URL.' },
                { status: 400 }
            )
        }

        // Create memory record in database with the provided URL
        const memory = await Memory.create({
            type: type || 'image',
            url,
            publicId: url,
            thumbnail,
            caption,
            date,
            poetry,
            tags: tags || [],
            isFavorite: isFavorite || false,
        })

        return NextResponse.json(memory, { status: 201 })
    } catch (error) {
        console.error('Error creating memory:', error)
        return NextResponse.json(
            { error: 'Failed to create memory' },
            { status: 500 }
        )
    }
}

// PUT update memory
export async function PUT(request: NextRequest) {
    try {
        await dbConnect()

        const body = await request.json()
        const { id, url, caption, date, poetry, type, thumbnail, tags, isFavorite } = body

        if (!id) {
            return NextResponse.json(
                { error: 'Memory ID is required' },
                { status: 400 }
            )
        }

        const updateData: Record<string, unknown> = {}
        if (url !== undefined) {
            updateData.url = url
            updateData.publicId = url
        }
        if (caption !== undefined) updateData.caption = caption
        if (date !== undefined) updateData.date = date
        if (poetry !== undefined) updateData.poetry = poetry
        if (type !== undefined) updateData.type = type
        if (thumbnail !== undefined) updateData.thumbnail = thumbnail
        if (tags !== undefined) updateData.tags = tags
        if (isFavorite !== undefined) updateData.isFavorite = isFavorite

        const memory = await Memory.findByIdAndUpdate(id, updateData, { new: true })

        if (!memory) {
            return NextResponse.json(
                { error: 'Memory not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(memory)
    } catch (error) {
        console.error('Error updating memory:', error)
        return NextResponse.json(
            { error: 'Failed to update memory' },
            { status: 500 }
        )
    }
}

// DELETE memory
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect()

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Memory ID required' },
                { status: 400 }
            )
        }

        const memory = await Memory.findById(id)
        if (!memory) {
            return NextResponse.json(
                { error: 'Memory not found' },
                { status: 404 }
            )
        }

        // Delete from database (no Cloudinary deletion needed - manage in Cloudinary dashboard)
        await Memory.findByIdAndDelete(id)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting memory:', error)
        return NextResponse.json(
            { error: 'Failed to delete memory' },
            { status: 500 }
        )
    }
}
