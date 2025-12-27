'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function LoadingScreen() {
    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-gradient-romantic flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="text-center">
                {/* Animated Heart */}
                <motion.div
                    className="mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <Heart className="w-16 h-16 text-romance-400 fill-romance-400 mx-auto" />
                    </motion.div>
                </motion.div>

                {/* Loading Text */}
                <motion.p
                    className="font-script text-3xl text-romance-500 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Loading Our Story
                </motion.p>

                {/* Progress Dots */}
                <motion.div
                    className="flex justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-blush-400"
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.15,
                            }}
                        />
                    ))}
                </motion.div>

                {/* Poetry Line */}
                <motion.p
                    className="font-serif text-sm text-midnight-400 italic mt-8 max-w-xs mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    "Every love story is beautiful, but ours is my favorite."
                </motion.p>
            </div>

            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    >
                        <Heart
                            className="text-blush-200"
                            style={{
                                width: 10 + Math.random() * 20,
                                height: 10 + Math.random() * 20,
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
