'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
    type: 'heart' | 'circle' | 'sparkle'
}

export function ParticlesBackground() {
    const [particles, setParticles] = useState<Particle[]>([])

    useEffect(() => {
        const generateParticles = () => {
            const newParticles: Particle[] = []
            const count = window.innerWidth < 768 ? 15 : 30

            for (let i = 0; i < count; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 8 + 4,
                    duration: Math.random() * 20 + 15,
                    delay: Math.random() * 10,
                    type: ['heart', 'circle', 'sparkle'][Math.floor(Math.random() * 3)] as Particle['type'],
                })
            }
            setParticles(newParticles)
        }

        generateParticles()
        window.addEventListener('resize', generateParticles)
        return () => window.removeEventListener('resize', generateParticles)
    }, [])

    return (
        <div className="particles-container">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute pointer-events-none"
                    style={{
                        left: `${particle.x}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    initial={{ y: '100vh', opacity: 0, rotate: 0 }}
                    animate={{
                        y: '-100vh',
                        opacity: [0, 0.6, 0.6, 0],
                        rotate: 360,
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {particle.type === 'heart' ? (
                        <HeartParticle size={particle.size} />
                    ) : particle.type === 'sparkle' ? (
                        <SparkleParticle size={particle.size} />
                    ) : (
                        <CircleParticle size={particle.size} />
                    )}
                </motion.div>
            ))}
        </div>
    )
}

function HeartParticle({ size }: { size: number }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-blush-300/40"
            style={{ width: size, height: size }}
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    )
}

function SparkleParticle({ size }: { size: number }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-champagne-400/50"
            style={{ width: size, height: size }}
        >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
    )
}

function CircleParticle({ size }: { size: number }) {
    return (
        <div
            className="rounded-full bg-blush-200/30"
            style={{ width: size, height: size }}
        />
    )
}

// Bokeh Effect Component
export function BokehBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Large Bokeh Circles */}
            <motion.div
                className="absolute w-96 h-96 rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 107, 138, 0.4) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    top: '10%',
                    left: '5%',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute w-80 h-80 rounded-full opacity-25"
                style={{
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                    top: '60%',
                    right: '10%',
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            />
            <motion.div
                className="absolute w-64 h-64 rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 182, 193, 0.5) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    bottom: '20%',
                    left: '40%',
                }}
                animate={{
                    x: [0, 60, 0],
                    y: [0, -30, 0],
                    scale: [1, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 5,
                }}
            />
        </div>
    )
}
