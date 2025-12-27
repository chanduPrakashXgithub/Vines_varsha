import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { SiteSettings } from '@/lib/models'

// GET site settings
export async function GET() {
    try {
        await dbConnect()

        let settings = await SiteSettings.findOne({})

        // Create default settings if none exist
        if (!settings) {
            settings = await SiteSettings.create({
                coupleName: 'Our Love Story',
                tagline: 'Every love story is beautiful, but ours is my favorite.',
                weddingDate: new Date('2024-12-31T10:00:00'),
                venue: 'Where Dreams Come True',
                privatePassword: 'ourlove',
            })
        }

        return NextResponse.json(settings)
    } catch (error) {
        console.error('Error fetching settings:', error)
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        )
    }
}

// PUT update site settings
export async function PUT(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()

        let settings = await SiteSettings.findOne({})

        if (settings) {
            settings = await SiteSettings.findByIdAndUpdate(
                settings._id,
                body,
                { new: true, runValidators: true }
            )
        } else {
            settings = await SiteSettings.create(body)
        }

        return NextResponse.json(settings)
    } catch (error) {
        console.error('Error updating settings:', error)
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        )
    }
}
