'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Star } from 'lucide-react'

interface EasterEggMessage {
    id: string
    message: string
    icon: 'heart' | 'sparkle' | 'star'
}

const secretMessages: EasterEggMessage[] = [
    { id: '1', message: 'You found a secret! Just like how we found each other 💕', icon: 'heart' },
    { id: '2', message: 'Every moment with you is a treasure ✨', icon: 'sparkle' },
    { id: '3', message: 'You are my today and all of my tomorrows ⭐', icon: 'star' },
    { id: '4', message: 'In a sea of people, my eyes will always search for you 💕', icon: 'heart' },
    { id: '5', message: 'You are the answer to every prayer I have ever prayed ✨', icon: 'sparkle' },
    { id: '6', message: 'I love you more than yesterday, less than tomorrow 💕', icon: 'heart' },
]

export function EasterEggs() {
    const [showMessage, setShowMessage] = useState<EasterEggMessage | null>(null)
    const [clickCount, setClickCount] = useState(0)
    const [konamiProgress, setKonamiProgress] = useState(0)
    const [showStars, setShowStars] = useState(false)

    // Konami code: up up down down left right left right b a
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ]

    // Random secret message on multiple clicks
    const handleSecretClick = useCallback(() => {
        setClickCount((prev) => {
            const newCount = prev + 1
            if (newCount >= 7) {
                const randomMessage = secretMessages[Math.floor(Math.random() * secretMessages.length)]
                setShowMessage(randomMessage)
                setTimeout(() => setShowMessage(null), 4000)
                return 0
            }
            return newCount
        })
    }, [])

    // Konami code listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === konamiCode[konamiProgress]) {
                const newProgress = konamiProgress + 1
                setKonamiProgress(newProgress)

                if (newProgress === konamiCode.length) {
                    // Konami code completed!
                    setShowStars(true)
                    setShowMessage({
                        id: 'konami',
                        message: '🎮 You found the ultimate secret! Our love is the cheat code to happiness!',
                        icon: 'star',
                    })
                    setTimeout(() => {
                        setShowMessage(null)
                        setShowStars(false)
                    }, 6000)
                    setKonamiProgress(0)
                }
            } else {
                setKonamiProgress(0)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [konamiProgress])

    // Reset click count after inactivity
    useEffect(() => {
        const timer = setTimeout(() => setClickCount(0), 3000)
        return () => clearTimeout(timer)
    }, [clickCount])

    return (
        <>
            {/* Hidden clickable hearts scattered around */}
            <HiddenHeart position={{ top: '20%', left: '5%' }} onClick={handleSecretClick} />
            <HiddenHeart position={{ top: '40%', right: '3%' }} onClick={handleSecretClick} />
            <HiddenHeart position={{ bottom: '30%', left: '8%' }} onClick={handleSecretClick} />
            <HiddenHeart position={{ bottom: '15%', right: '10%' }} onClick={handleSecretClick} />

            {/* Secret Message Popup */}
            <AnimatePresence>
                {showMessage && (
                    <SecretMessagePopup message={showMessage} onClose={() => setShowMessage(null)} />
                )}
            </AnimatePresence>

            {/* Konami Stars Rain */}
            <AnimatePresence>
                {showStars && <StarsRain />}
            </AnimatePresence>
        </>
    )
}

interface HiddenHeartProps {
    position: React.CSSProperties
    onClick: () => void
}

function HiddenHeart({ position, onClick }: HiddenHeartProps) {
    const [isFound, setIsFound] = useState(false)

    return (
        <motion.button
            className="fixed z-40 opacity-0 hover:opacity-100 transition-opacity duration-1000"
            style={position}
            onClick={() => {
                setIsFound(true)
                onClick()
                setTimeout(() => setIsFound(false), 1000)
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
        >
            <Heart
                className={`w-6 h-6 transition-colors duration-300 ${isFound ? 'text-romance-500 fill-romance-500' : 'text-blush-300'
                    }`}
            />
            {isFound && (
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Heart className="w-6 h-6 text-romance-400" />
                </motion.div>
            )}
        </motion.button>
    )
}

interface SecretMessagePopupProps {
    message: EasterEggMessage
    onClose: () => void
}

function SecretMessagePopup({ message, onClose }: SecretMessagePopupProps) {
    const icons = {
        heart: Heart,
        sparkle: Sparkles,
        star: Star,
    }
    const Icon = icons[message.icon]

    return (
        <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', damping: 15 }}
        >
            <div className="glass-romantic p-8 rounded-3xl max-w-sm text-center shadow-glow-pink">
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Icon className="w-12 h-12 text-romance-500 mx-auto mb-4" />
                </motion.div>

                <p className="font-serif text-lg text-midnight-700">
                    {message.message}
                </p>

                <button
                    onClick={onClose}
                    className="mt-6 text-xs text-midnight-400 hover:text-romance-500 transition-colors"
                >
                    Close
                </button>
            </div>
        </motion.div>
    )
}

function StarsRain() {
    return (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: -20,
                    }}
                    initial={{ y: -20, opacity: 1, rotate: 0 }}
                    animate={{
                        y: '100vh',
                        opacity: [1, 1, 0],
                        rotate: 360,
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        delay: Math.random() * 2,
                        ease: 'linear',
                    }}
                >
                    <Star
                        className="text-champagne-400"
                        style={{
                            width: 10 + Math.random() * 20,
                            height: 10 + Math.random() * 20,
                        }}
                        fill="currentColor"
                    />
                </motion.div>
            ))}
        </div>
    )
}

// Scroll-triggered secret messages
export function ScrollSecrets() {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [shownSecrets, setShownSecrets] = useState<Set<number>>(new Set())
    const [currentSecret, setCurrentSecret] = useState<string | null>(null)

    const scrollSecrets = [
        { trigger: 25, message: 'Keep scrolling... our story gets better 💕' },
        { trigger: 50, message: 'Halfway through and still falling for you ✨' },
        { trigger: 75, message: 'Almost there... the best is yet to come ⭐' },
        { trigger: 95, message: 'You reached the end! But our story never ends 💕' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (window.scrollY / scrollHeight) * 100
            setScrollProgress(progress)

            // Check for triggered secrets
            scrollSecrets.forEach((secret) => {
                if (progress >= secret.trigger && !shownSecrets.has(secret.trigger)) {
                    setShownSecrets((prev) => new Set([...Array.from(prev), secret.trigger]))
                    setCurrentSecret(secret.message)
                    setTimeout(() => setCurrentSecret(null), 3000)
                }
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [shownSecrets])

    return (
        <AnimatePresence>
            {currentSecret && (
                <motion.div
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div className="glass rounded-full px-6 py-3 text-center">
                        <p className="font-serif text-sm text-midnight-600">
                            {currentSecret}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
