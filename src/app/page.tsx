'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroSection } from '@/components/sections/HeroSection'
import { LoveTimeline } from '@/components/sections/LoveTimeline'
import { LoveLettersVault } from '@/components/sections/LoveLettersVault'
import { MemoriesGallery } from '@/components/sections/MemoriesGallery'
import { VideoMemoriesRoom } from '@/components/sections/VideoMemoriesRoom'
import { WeddingCountdown } from '@/components/sections/WeddingCountdown'
import { PrivateSpace } from '@/components/sections/PrivateSpace'
import { Footer } from '@/components/sections/Footer'
import { MusicControl } from '@/components/ui/MusicControl'
import { EasterEggs, ScrollSecrets } from '@/components/effects/EasterEggs'
import { Navigation } from '@/components/ui/Navigation'
import { LoadingScreen } from '@/components/ui/LoadingScreen'

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [hasEntered, setHasEntered] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500)
        return () => clearTimeout(timer)
    }, [])

    const handleEnter = () => {
        setHasEntered(true)
    }

    const handleAuthenticate = async (password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })
            const data = await response.json()
            if (data.authenticated) {
                setIsAuthenticated(true)
                return true
            }
            return false
        } catch {
            // Default fallback for demo
            if (password === 'ourlove') {
                setIsAuthenticated(true)
                return true
            }
            return false
        }
    }

    return (
        <>
            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && <LoadingScreen />}
            </AnimatePresence>

            {/* Main Content */}
            <AnimatePresence>
                {!isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Hero / Landing */}
                        {!hasEntered && (
                            <HeroSection
                                onEnter={handleEnter}
                                coupleName="Our Love Story - your love Varshitha"
                                tagline="Every love story is beautiful, but ours is my favorite."
                            />
                        )}

                        {/* Main Sections */}
                        {hasEntered && (
                            <>
                                {/* Navigation */}
                                <Navigation />

                                {/* Music Control */}
                                <MusicControl />

                                {/* Easter Eggs */}
                                <EasterEggs />
                                <ScrollSecrets />

                                {/* Smooth Scroll Container */}
                                <div className="relative">
                                    {/* Welcome Section */}
                                    <WelcomeSection />

                                    {/* Love Timeline */}
                                    <LoveTimeline />

                                    {/* Love Letters */}
                                    <LoveLettersVault canAdd={true} />

                                    {/* Memories Gallery */}
                                    <MemoriesGallery canEdit={true} />

                                    {/* Video Memories */}
                                    <VideoMemoriesRoom canEdit={true} />

                                    {/* Wedding Countdown */}
                                    <WeddingCountdown
                                        weddingDate={new Date(process.env.NEXT_PUBLIC_WEDDING_DATE || '2024-12-31T10:00:00')}
                                        coupleName="Our Wedding Day"
                                        venue="Where Our Forever Begins"
                                    />

                                    {/* Private Space */}
                                    <PrivateSpace
                                        isAuthenticated={isAuthenticated}
                                        onAuthenticate={handleAuthenticate}
                                    />

                                    {/* Footer */}
                                    <Footer coupleName="Our Love Story" />
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

// Welcome Section after entering
function WelcomeSection() {
    return (
        <motion.section
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blush-50 via-ivory-50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                <motion.span
                    className="text-champagne-600 uppercase tracking-[0.3em] text-sm font-sans mb-6 block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    Welcome to Our Universe
                </motion.span>

                <motion.h1
                    className="heading-romantic text-5xl md:text-7xl mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    Our Love Story
                </motion.h1>

                <motion.div
                    className="divider-romantic"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                />

                <motion.p
                    className="text-poetic max-w-2xl mx-auto mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                >
                    Welcome to our digital love universe. This is not just a website—it's a journey through
                    our hearts, a collection of moments that define us, and a celebration of a love that
                    will last forever.
                </motion.p>

                <motion.p
                    className="text-poetic max-w-xl mx-auto mt-6 text-romance-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                >
                    "Two souls with but a single thought, two hearts that beat as one."
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        className="w-6 h-10 rounded-full border-2 border-blush-300 mx-auto flex justify-center pt-2"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <motion.div
                            className="w-1.5 h-2.5 rounded-full bg-romance-400"
                            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                    <span className="text-xs text-midnight-400 mt-3 block">Scroll to Explore</span>
                </motion.div>
            </div>
        </motion.section>
    )
}
