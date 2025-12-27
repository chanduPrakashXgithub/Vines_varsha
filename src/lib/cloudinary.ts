/**
 * Cloudinary URL Helpers
 * 
 * This file provides helper functions for working with Cloudinary URLs.
 * No API keys required - just paste your Cloudinary URLs directly!
 * 
 * How to use:
 * 1. Upload images/videos to your Cloudinary account manually
 * 2. Copy the URL from Cloudinary
 * 3. Paste the URL directly in the database or components
 */

// Your Cloudinary cloud name (optional - only needed for URL building)
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud-name'

export interface MediaItem {
    url: string
    publicId?: string
    type: 'image' | 'video'
    width?: number
    height?: number
    caption?: string
}

/**
 * Check if a URL is a valid Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
    return url.includes('cloudinary.com') || url.includes('res.cloudinary.com')
}

/**
 * Extract public ID from a Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
    if (!isCloudinaryUrl(url)) return null

    const match = url.match(/\/v\d+\/(.+?)(?:\.\w+)?$/)
    return match ? match[1] : null
}

/**
 * Add transformations to a Cloudinary URL
 * Works with any existing Cloudinary URL
 */
export function transformCloudinaryUrl(
    url: string,
    options: {
        width?: number
        height?: number
        quality?: number | 'auto'
        format?: string
        crop?: 'fill' | 'fit' | 'scale' | 'thumb'
        blur?: number
    } = {}
): string {
    if (!isCloudinaryUrl(url)) return url

    const { width, height, quality = 'auto', format = 'auto', crop = 'fill', blur } = options

    const transforms: string[] = []
    if (width) transforms.push(`w_${width}`)
    if (height) transforms.push(`h_${height}`)
    if (crop && (width || height)) transforms.push(`c_${crop}`)
    if (quality) transforms.push(`q_${quality}`)
    if (format) transforms.push(`f_${format}`)
    if (blur) transforms.push(`e_blur:${blur}`)

    if (transforms.length === 0) return url

    const transformString = transforms.join(',')

    // Insert transformations into URL
    return url.replace('/upload/', `/upload/${transformString}/`)
}

/**
 * Get optimized image URL (convenience wrapper)
 */
export function getOptimizedImageUrl(
    url: string,
    options: { width?: number; height?: number; quality?: number } = {}
): string {
    return transformCloudinaryUrl(url, {
        ...options,
        format: 'auto',
        crop: 'fill'
    })
}

/**
 * Get video thumbnail from Cloudinary video URL
 */
export function getVideoThumbnail(
    videoUrl: string,
    options: { width?: number; time?: number } = {}
): string {
    if (!isCloudinaryUrl(videoUrl)) return videoUrl

    const { width = 400, time = 0 } = options

    // Convert video URL to image thumbnail
    return videoUrl
        .replace('/video/upload/', `/video/upload/w_${width},so_${time},f_jpg/`)
        .replace(/\.\w+$/, '.jpg')
}

/**
 * Build a Cloudinary URL from public ID
 * Use this if you only have the public ID
 */
export function buildCloudinaryUrl(
    publicId: string,
    type: 'image' | 'video' = 'image'
): string {
    return `https://res.cloudinary.com/${CLOUD_NAME}/${type}/upload/${publicId}`
}

/**
 * Placeholder image URL for when no image is available
 */
export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80'
export const PLACEHOLDER_COUPLE = 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80'
export const PLACEHOLDER_WEDDING = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'

/**
 * Sample romantic images (use these as defaults until you add your own)
 */
export const SAMPLE_IMAGES = {
    hero: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1920&q=80',
    couple1: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    couple2: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    rings: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80',
    flowers: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
    venue: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
}
