'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Heart, Instagram, Mail, Sparkles } from 'lucide-react'

interface FooterProps {
    coupleName?: string
    instagram?: string
    email?: string
}

export function Footer({
    coupleName = 'Our Love Story',
    instagram,
    email
}: FooterProps) {
    const footerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(footerRef, { once: true, margin: '-50px' })

    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ['start end', 'end end'],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
    const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])

    return (
        <footer
            ref={footerRef}
            className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-ivory-50 to-blush-50"
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 107, 138, 0.4) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        bottom: '-200px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                />
            </div>

            <motion.div
                className="relative z-10 max-w-4xl mx-auto px-6 text-center"
                style={{ opacity, y }}
            >
                {/* Heart Animation */}
                <motion.div
                    className="flex justify-center mb-8"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3, type: 'spring' }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart className="w-12 h-12 text-romance-400 fill-romance-400" />
                    </motion.div>
                </motion.div>

                {/* Main Text */}
                <motion.h2
                    className="font-script text-4xl md:text-5xl text-romance-600 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    {coupleName}
                </motion.h2>

                <motion.p
                    className="font-serif text-lg text-midnight-500 italic mb-8 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    Built with love, Made with heart, designed for forever.
                </motion.p>

                {/* Social Links */}
                <motion.div
                    className="flex justify-center gap-6 mb-12"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    {instagram && (
                        <a
                            href={`https://instagram.com/${instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full glass flex items-center justify-center
                       text-midnight-500 hover:text-romance-500 hover:shadow-glow-pink
                       transition-all duration-300"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                    )}
                    {email && (
                        <a
                            href={`mailto:${email}`}
                            className="w-12 h-12 rounded-full glass flex items-center justify-center
                       text-midnight-500 hover:text-romance-500 hover:shadow-glow-pink
                       transition-all duration-300"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    )}
                </motion.div>

                {/* Divider */}
                <div className="divider-romantic" />

                {/* Final Poetry */}
                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 }}
                >
                    <p className="font-serif text-sm text-midnight-400 mb-4">
                        "And in the end, the love you take is equal to the love you make."
                    </p>

                    <div className="flex items-center justify-center gap-2 text-champagne-600 text-xs">
                        <Sparkles className="w-4 h-4" />
                        <span>Made with infinite love - Varshitha</span>
                        <Sparkles className="w-4 h-4" />
                    </div>
                </motion.div>

                {/* Copyright */}
                <motion.p
                    className="mt-8 text-xs text-midnight-400"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    © {new Date().getFullYear()} {coupleName} • A Private Love Story- Varshita
                </motion.p>
            </motion.div>

            {/* Floating Hearts */}
            <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bottom-0"
                        style={{ left: `${20 + i * 15}%` }}
                        initial={{ y: 0, opacity: 0.3 }}
                        animate={{
                            y: [-20, 0, -20],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    >
                        <Heart
                            className="text-blush-200"
                            style={{ width: 15 + i * 5, height: 15 + i * 5 }}
                        />
                    </motion.div>
                ))}
            </div>
        </footer>
    )
}
