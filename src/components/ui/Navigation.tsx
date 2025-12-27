'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Menu, X, Calendar, BookHeart, Image, Film, Lock, Clock } from 'lucide-react'

const navItems = [
    { id: 'timeline', label: 'Our Journey', icon: Clock },
    { id: 'letters', label: 'Love Letters', icon: BookHeart },
    { id: 'gallery', label: 'Memories', icon: Image },
    { id: 'videos', label: 'Videos', icon: Film },
    { id: 'countdown', label: 'Countdown', icon: Calendar },
    { id: 'private', label: 'Private', icon: Lock },
]

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    // Handle scroll for navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            // Determine active section
            const sections = navItems.map((item) => item.id)
            for (const section of sections.reverse()) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 200) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        setIsOpen(false)
    }

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div
                        className={`rounded-full transition-all duration-500 ${isScrolled
                                ? 'glass shadow-glass py-2 px-6'
                                : 'bg-transparent py-0 px-0'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <motion.button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="flex items-center gap-2 text-romance-500"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Heart className="w-6 h-6 fill-current" />
                                <span className="font-script text-2xl hidden sm:block">Us</span>
                            </motion.button>

                            {/* Desktop Menu */}
                            <div className="hidden lg:flex items-center gap-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon
                                    const isActive = activeSection === item.id

                                    return (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm
                               transition-all duration-300 ${isActive
                                                    ? 'bg-romance-500/20 text-romance-600'
                                                    : 'text-midnight-600 hover:text-romance-500 hover:bg-blush-100/50'
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="font-sans tracking-wide">{item.label}</span>
                                        </motion.button>
                                    )
                                })}
                            </div>

                            {/* Mobile Menu Button */}
                            <motion.button
                                className="lg:hidden w-10 h-10 rounded-full glass flex items-center justify-center"
                                onClick={() => setIsOpen(true)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Menu className="w-5 h-5 text-midnight-600" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-midnight-900/60 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-ivory-50 shadow-2xl"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                        >
                            {/* Close Button */}
                            <div className="flex justify-end p-4">
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X className="w-5 h-5 text-midnight-600" />
                                </motion.button>
                            </div>

                            {/* Menu Items */}
                            <div className="px-6 py-4">
                                <div className="mb-8 text-center">
                                    <Heart className="w-10 h-10 text-romance-400 fill-romance-400 mx-auto mb-2" />
                                    <span className="font-script text-2xl text-romance-500">Our Story</span>
                                </div>

                                <nav className="space-y-2">
                                    {navItems.map((item, index) => {
                                        const Icon = item.icon
                                        const isActive = activeSection === item.id

                                        return (
                                            <motion.button
                                                key={item.id}
                                                onClick={() => scrollToSection(item.id)}
                                                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3
                                 transition-all duration-300 ${isActive
                                                        ? 'bg-romance-500/20 text-romance-600'
                                                        : 'text-midnight-600 hover:bg-blush-100'
                                                    }`}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + index * 0.05 }}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span className="font-serif">{item.label}</span>
                                            </motion.button>
                                        )
                                    })}
                                </nav>

                                {/* Footer */}
                                <motion.div
                                    className="mt-12 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <p className="font-serif text-sm text-midnight-400 italic">
                                        "Together forever, never apart."
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Progress Indicator */}
            <ScrollProgress />
        </>
    )
}

function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollProgress = (window.scrollY / scrollHeight) * 100
            setProgress(scrollProgress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[51]">
            <motion.div
                className="h-full bg-gradient-to-r from-blush-400 via-romance-500 to-champagne-500"
                style={{ width: `${progress}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.1 }}
            />
        </div>
    )
}
