import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { VideoMemory } from '@/lib/models'

// GET all videos
export async function GET(request: NextRequest) {
    try {
        await dbConnect()

        const { searchParams } = new URL(request.url)
        const favorite = searchParams.get('favorite')

        const query: Record<string, unknown> = {}
        if (favorite === 'true') query.isFavorite = true

        const videos = await VideoMemory.find(query).sort({ createdAt: -1 })
        return NextResponse.json(videos)
    } catch (error) {
        console.error('Error fetching videos:', error)
        return NextResponse.json(
            { error: 'Failed to fetch videos' },
            { status: 500 }
        )
    }
}

// POST create new video
export async function POST(request: NextRequest) {
    try {
        await dbConnect()

        const body = await request.json()
        const { title, url, thumbnail, duration, description, date, tags, isFavorite } = body

        if (!url) {
            return NextResponse.json(
                { error: 'Video URL is required. Please provide your Cloudinary video URL.' },
                { status: 400 }
            )
        }

        if (!title) {
            return NextResponse.json(
                { error: 'Title is required.' },
                { status: 400 }
            )
        }

        const video = await VideoMemory.create({
            title,
            url,
            thumbnail,
            duration,
            description,
            date,
            tags: tags || [],
            isFavorite: isFavorite || false,
        })

        return NextResponse.json(video, { status: 201 })
    } catch (error) {
        console.error('Error creating video:', error)
        return NextResponse.json(
            { error: 'Failed to create video' },
            { status: 500 }
        )
    }
}

// PUT update video
export async function PUT(request: NextRequest) {
    try {
        await dbConnect()

        const body = await request.json()
        const { id, title, url, thumbnail, duration, description, date, tags, isFavorite } = body

        if (!id) {
            return NextResponse.json(
                { error: 'Video ID is required' },
                { status: 400 }
            )
        }

        const updateData: Record<string, unknown> = {}
        if (title !== undefined) updateData.title = title
        if (url !== undefined) updateData.url = url
        if (thumbnail !== undefined) updateData.thumbnail = thumbnail
        if (duration !== undefined) updateData.duration = duration
        if (description !== undefined) updateData.description = description
        if (date !== undefined) updateData.date = date
        if (tags !== undefined) updateData.tags = tags
        if (isFavorite !== undefined) updateData.isFavorite = isFavorite

        const video = await VideoMemory.findByIdAndUpdate(id, updateData, { new: true })

        if (!video) {
            return NextResponse.json(
                { error: 'Video not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(video)
    } catch (error) {
        console.error('Error updating video:', error)
        return NextResponse.json(
            { error: 'Failed to update video' },
            { status: 500 }
        )
    }
}

// DELETE video
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect()

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Video ID required' },
                { status: 400 }
            )
        }

        const video = await VideoMemory.findById(id)
        if (!video) {
            return NextResponse.json(
                { error: 'Video not found' },
                { status: 404 }
            )
        }

        await VideoMemory.findByIdAndDelete(id)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting video:', error)
        return NextResponse.json(
            { error: 'Failed to delete video' },
            { status: 500 }
        )
    }
}
