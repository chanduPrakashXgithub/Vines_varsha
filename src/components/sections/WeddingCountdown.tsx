'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Heart, Calendar, Clock, Sparkles, Gift } from 'lucide-react'

interface WeddingCountdownProps {
    weddingDate?: Date
    coupleName?: string
    venue?: string
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
    isWeddingDay: boolean
    isPast: boolean
}

export function WeddingCountdown({
    weddingDate = new Date('2024-12-31T10:00:00'),
    coupleName = 'Our Wedding',
    venue = 'Where Dreams Come True'
}: WeddingCountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isWeddingDay: false,
        isPast: false,
    })
    const [showSpecialMessage, setShowSpecialMessage] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date()
            const difference = weddingDate.getTime() - now.getTime()

            // Check if it's the wedding day
            const isWeddingDay =
                now.getDate() === weddingDate.getDate() &&
                now.getMonth() === weddingDate.getMonth() &&
                now.getFullYear() === weddingDate.getFullYear()

            if (difference <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isWeddingDay,
                    isPast: !isWeddingDay,
                })
                return
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                isWeddingDay,
                isPast: false,
            })
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)
        return () => clearInterval(timer)
    }, [weddingDate])

    // Show special message on wedding day
    useEffect(() => {
        if (timeLeft.isWeddingDay) {
            setShowSpecialMessage(true)
        }
    }, [timeLeft.isWeddingDay])

    return (
        <section
            ref={sectionRef}
            className="relative py-20 md:py-32 overflow-hidden"
            id="countdown"
        >
            {/* Romantic Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blush-50 via-ivory-50 to-champagne-50" />

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute w-96 h-96 rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 107, 138, 0.4) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        top: '10%',
                        right: '10%',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-80 h-80 rounded-full opacity-15"
                    style={{
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                        bottom: '20%',
                        left: '5%',
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="flex justify-center mb-6"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.3, type: 'spring' }}
                    >
                        <div className="w-20 h-20 rounded-full glass-romantic flex items-center justify-center">
                            <Calendar className="w-10 h-10 text-romance-500" />
                        </div>
                    </motion.div>

                    <motion.span
                        className="text-champagne-600 uppercase tracking-[0.3em] text-sm font-sans mb-4 block"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        {timeLeft.isWeddingDay ? 'Today Is The Day!' : 'Save The Date'}
                    </motion.span>

                    <h2 className="heading-romantic text-5xl md:text-7xl mb-4">
                        {coupleName}
                    </h2>

                    <p className="text-poetic max-w-xl mx-auto mb-2">
                        {venue}
                    </p>

                    <p className="font-serif text-lg text-midnight-500">
                        {weddingDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>

                    <div className="divider-romantic mt-8" />
                </motion.div>

                {/* Wedding Day Special Message */}
                <AnimatePresence>
                    {showSpecialMessage && (
                        <WeddingDayMessage onClose={() => setShowSpecialMessage(false)} />
                    )}
                </AnimatePresence>

                {/* Countdown Display */}
                {!timeLeft.isWeddingDay && !timeLeft.isPast && (
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <CountdownUnit value={timeLeft.days} label="Days" delay={0.1} />
                        <CountdownUnit value={timeLeft.hours} label="Hours" delay={0.2} />
                        <CountdownUnit value={timeLeft.minutes} label="Minutes" delay={0.3} />
                        <CountdownUnit value={timeLeft.seconds} label="Seconds" delay={0.4} isSeconds />
                    </motion.div>
                )}

                {/* Special Messages Based on Time */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    {timeLeft.isWeddingDay ? (
                        <div className="glass-romantic p-8 md:p-12 rounded-3xl">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Heart className="w-16 h-16 text-romance-500 mx-auto mb-6 fill-romance-500" />
                            </motion.div>
                            <h3 className="font-script text-4xl md:text-5xl text-romance-600 mb-4">
                                Today We Become One
                            </h3>
                            <p className="text-poetic max-w-md mx-auto">
                                This is the first day of our forever.
                                Every moment has led us here, and every moment after belongs to us.
                            </p>
                        </div>
                    ) : timeLeft.isPast ? (
                        <div className="glass-romantic p-8 md:p-12 rounded-3xl">
                            <Sparkles className="w-16 h-16 text-champagne-500 mx-auto mb-6" />
                            <h3 className="font-script text-4xl md:text-5xl text-romance-600 mb-4">
                                We're Married!
                            </h3>
                            <p className="text-poetic max-w-md mx-auto">
                                Our journey as one has begun. Thank you for being part of our love story.
                            </p>
                        </div>
                    ) : timeLeft.days <= 7 ? (
                        <div className="flex items-center justify-center gap-3 text-romance-500">
                            <Gift className="w-6 h-6" />
                            <span className="font-serif text-lg italic">
                                Only {timeLeft.days} {timeLeft.days === 1 ? 'day' : 'days'} until forever begins!
                            </span>
                            <Gift className="w-6 h-6" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-3 text-midnight-500">
                            <Clock className="w-5 h-5" />
                            <span className="font-serif text-lg">
                                Every second brings us closer to our forever
                            </span>
                        </div>
                    )}
                </motion.div>

                {/* Floating Hearts Animation */}
                <FloatingCountdownHearts />
            </div>
        </section>
    )
}

interface CountdownUnitProps {
    value: number
    label: string
    delay: number
    isSeconds?: boolean
}

function CountdownUnit({ value, label, delay, isSeconds = false }: CountdownUnitProps) {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay }}
        >
            <div className="glass-romantic p-6 md:p-8 rounded-2xl text-center relative overflow-hidden group
                    hover:shadow-glow-pink transition-shadow duration-500">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                {/* Value */}
                <motion.div
                    className="relative"
                    key={value}
                    initial={isSeconds ? { scale: 1.2, opacity: 0.5 } : {}}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="font-script text-5xl md:text-7xl text-gradient-romantic block mb-2">
                        {String(value).padStart(2, '0')}
                    </span>
                </motion.div>

                {/* Label */}
                <span className="uppercase tracking-widest text-xs text-midnight-500 font-sans">
                    {label}
                </span>

                {/* Decorative Corner */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 opacity-20">
                    <Heart className="w-full h-full text-romance-400" />
                </div>
            </div>
        </motion.div>
    )
}

function WeddingDayMessage({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="absolute inset-0 bg-midnight-900/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                className="relative z-10 glass-romantic p-8 md:p-12 rounded-3xl max-w-lg text-center"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
            >
                {/* Confetti Animation */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ['#FF6B8A', '#D4AF37', '#FFB6C1', '#F7E7CE'][i % 4],
                            }}
                            initial={{ y: -20, opacity: 1 }}
                            animate={{
                                y: '100vh',
                                opacity: 0,
                                rotate: Math.random() * 360,
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                delay: Math.random() * 2,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Heart className="w-20 h-20 text-romance-500 mx-auto mb-6 fill-romance-500" />
                </motion.div>

                <h2 className="font-script text-5xl text-romance-600 mb-4">
                    Today is the Day!
                </h2>

                <p className="font-serif text-xl text-midnight-600 mb-6 leading-relaxed">
                    Every love story is beautiful, but today, ours becomes eternal.
                    Welcome to the first day of forever.
                </p>

                <motion.button
                    onClick={onClose}
                    className="btn-romantic"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Begin Our Forever
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

function FloatingCountdownHearts() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: `${15 + i * 15}%` }}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{
                        y: '-100%',
                        opacity: [0, 0.3, 0.3, 0],
                        rotate: [-20, 20, -20],
                    }}
                    transition={{
                        duration: 15 + i * 3,
                        delay: i * 2,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <Heart
                        className="text-blush-200"
                        style={{ width: 15 + i * 5, height: 15 + i * 5 }}
                    />
                </motion.div>
            ))}
        </div>
    )
}
