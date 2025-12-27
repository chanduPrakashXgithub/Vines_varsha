import type { Metadata, Viewport } from 'next'
import { Great_Vibes, Cormorant_Garamond, Lato } from 'next/font/google'
import './globals.css'
import { AudioProvider } from '@/components/providers/AudioProvider'
import { ParticlesBackground } from '@/components/effects/ParticlesBackground'

// Romantic Script Font
const greatVibes = Great_Vibes({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-great-vibes',
    display: 'swap',
})

// Elegant Serif Font
const cormorant = Cormorant_Garamond({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-cormorant',
    display: 'swap',
})

// Clean Sans Font
const lato = Lato({
    weight: ['300', '400', '700'],
    subsets: ['latin'],
    variable: '--font-lato',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Our Love Story | A Digital Universe of Us',
    description: 'A private journey through our love story - every moment, every memory, forever preserved.',
    keywords: ['love', 'wedding', 'memories', 'story'],
    authors: [{ name: 'Made with Love' }],
    openGraph: {
        title: 'Our Love Story',
        description: 'A digital universe of love and memories',
        type: 'website',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#FFE0E6',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${greatVibes.variable} ${cormorant.variable} ${lato.variable}`}>
            <body className="min-h-screen bg-gradient-romantic antialiased">
                <AudioProvider>
                    <ParticlesBackground />
                    <main className="relative z-10">
                        {children}
                    </main>
                </AudioProvider>
            </body>
        </html>
    )
}
