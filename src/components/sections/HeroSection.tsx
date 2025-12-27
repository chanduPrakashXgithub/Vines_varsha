'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Heart, ChevronDown, Sparkles } from 'lucide-react'
import { useAudio } from '@/components/providers/AudioProvider'

interface HeroSectionProps {
    onEnter: () => void
    coupleName?: string
    tagline?: string
}

export function HeroSection({
    onEnter,
    coupleName = "Our Love Story",
    tagline = "Every love story is beautiful, but ours is my favorite."
}: HeroSectionProps) {
    const [isReady, setIsReady] = useState(false)
    const [hasEntered, setHasEntered] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { togglePlay, isPlaying } = useAudio()

    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const scale = useTransform(scrollY, [0, 300], [1, 0.95])
    const y = useTransform(scrollY, [0, 300], [0, 50])

    useEffect(() => {
        // Dramatic entrance timing
        const timer = setTimeout(() => setIsReady(true), 500)
        return () => clearTimeout(timer)
    }, [])

    const handleEnter = () => {
        if (!isPlaying) {
            togglePlay()
        }
        setHasEntered(true)
        setTimeout(onEnter, 1500)
    }

    return (
        <motion.section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ opacity, scale, y }}
        >
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-blush-50 via-ivory-50 to-champagne-50" />

                {/* Animated Gradient Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,107,138,0.4) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-25"
                    style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                    }}
                    animate={{
                        x: [0, -80, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {isReady && !hasEntered && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
                            transition={{ duration: 1 }}
                        >
                            {/* Decorative Hearts */}
                            <motion.div
                                className="flex justify-center gap-4 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                            >
                                <Sparkles className="w-6 h-6 text-champagne-500 animate-twinkle" />
                                <Heart className="w-8 h-8 text-romance-400 animate-heartbeat" />
                                <Sparkles className="w-6 h-6 text-champagne-500 animate-twinkle delay-500" />
                            </motion.div>

                            {/* Main Title */}
                            <motion.h1
                                className="heading-romantic mb-6"
                                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                            >
                                {coupleName}
                            </motion.h1>

                            {/* Decorative Divider */}
                            <motion.div
                                className="divider-romantic"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                            />

                            {/* Tagline */}
                            <motion.p
                                className="text-poetic max-w-2xl mx-auto mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 1 }}
                            >
                                "{tagline}"
                            </motion.p>

                            {/* Enter Button */}
                            <motion.button
                                onClick={handleEnter}
                                className="group relative"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.8, duration: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Glow Effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-romance-400 opacity-0 blur-xl
                           group-hover:opacity-40 transition-opacity duration-500"
                                />

                                {/* Button Content */}
                                <div className="relative btn-romantic flex items-center gap-3">
                                    <span>Enter Our Story</span>
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <Heart className="w-5 h-5" />
                                    </motion.div>
                                </div>

                                {/* Sparkle Effects on Hover */}
                                <motion.div
                                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                >
                                    <Sparkles className="w-4 h-4 text-champagne-500" />
                                </motion.div>
                            </motion.button>

                            {/* Scroll Hint */}
                            <motion.div
                                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ delay: 3, duration: 1 }}
                            >
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="flex flex-col items-center gap-2 text-midnight-400"
                                >
                                    <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Transition Animation */}
                    {hasEntered && (
                        <motion.div
                            key="transition"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: [0, 1.5, 50] }}
                            transition={{ duration: 1.5, ease: 'easeIn' }}
                            className="flex items-center justify-center"
                        >
                            <Heart className="w-20 h-20 text-romance-400" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Hearts Decoration */}
            <FloatingHearts />
        </motion.section>
    )
}

// Floating Hearts Animation
function FloatingHearts() {
    const hearts = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10,
        size: 12 + Math.random() * 20,
    }))

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute bottom-0"
                    style={{ left: `${heart.left}%` }}
                    initial={{ y: '100%', opacity: 0, rotate: -20 }}
                    animate={{
                        y: '-100vh',
                        opacity: [0, 0.4, 0.4, 0],
                        rotate: [- 20, 20, -20],
                    }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <Heart
                        className="text-blush-300"
                        style={{ width: heart.size, height: heart.size }}
                    />
                </motion.div>
            ))}
        </div>
    )
}
