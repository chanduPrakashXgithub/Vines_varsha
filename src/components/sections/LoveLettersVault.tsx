'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Mail, X, Heart, Feather, Lock, Plus } from 'lucide-react'

interface LoveLetter {
    id: string
    title: string
    date: string
    preview: string
    content: string
    from: string
    isPrivate?: boolean
}

interface LoveLettersVaultProps {
    letters?: LoveLetter[]
    canAdd?: boolean
    onAddLetter?: (letter: Omit<LoveLetter, 'id'>) => void
}

const defaultLetters: LoveLetter[] = [
    {
        id: '1',
        title: 'To My Forever',
        date: 'On the day we met',
        preview: 'I never believed in fate until...',
        content: `My Dearest Love,

I never believed in fate until the day our eyes met across that crowded room. In that single moment, everything I thought I knew about love was rewritten.

You are the poetry I never knew my heart could write, the melody that plays in my soul when I close my eyes. Every day with you feels like the first page of a beautiful story that I never want to end.

When I look at you, I don't just see the person I love—I see my home, my peace, my greatest adventure. You've taught me that love isn't just a feeling; it's a choice we make every day, and I choose you. Today, tomorrow, and every day after.

Forever yours,
Your Soulmate`,
        from: 'Your Soulmate',
    },
    {
        id: '2',
        title: 'My Promise to You',
        date: 'Before our wedding',
        preview: 'These vows I write with my whole heart...',
        content: `My Beloved,

These vows I write with my whole heart, sealed with every beat that belongs to you.

I promise to be your shelter in the storm and your sunshine on cloudy days. I promise to hold your hand through every challenge and celebrate every victory as if it were my own.

I promise to love you not just when it's easy, but especially when it's hard. I promise to choose you, every single day, for the rest of my life.

You are my answered prayer, my beautiful surprise, my happily ever after.

With all my love,
Your Soon-to-be Spouse`,
        from: 'Your Forever',
    },
    {
        id: '3',
        title: 'For Our Future',
        date: 'A letter to tomorrow',
        preview: 'When you read this years from now...',
        content: `To the Love of My Life,

When you read this years from now, I hope we're sitting somewhere beautiful, hands still intertwined, hearts still dancing to the same rhythm.

I'm writing this to remind you—to remind us—of how magical this moment feels. The excitement of building our life together, the dreams we're weaving, the love that grows deeper each day.

Whatever the future holds, know this: my love for you is not bound by time. It will grow, evolve, and deepen, but it will never fade.

Here's to every sunrise we'll share, every adventure we'll take, and every ordinary moment we'll make extraordinary, simply because we're together.

Eternally yours,
Your Life Partner`,
        from: 'Your Partner',
        isPrivate: true,
    },
]

export function LoveLettersVault({
    letters = defaultLetters,
    canAdd = false,
    onAddLetter
}: LoveLettersVaultProps) {
    const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            ref={sectionRef}
            className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-ivory-50 via-blush-50/30 to-ivory-50"
            id="letters"
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23DC143C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Section Header */}
            <motion.div
                className="text-center mb-16 md:mb-24 px-6 relative z-10"
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
                        <Feather className="w-10 h-10 text-romance-500" />
                    </div>
                </motion.div>

                <motion.span
                    className="text-champagne-600 uppercase tracking-[0.3em] text-sm font-sans mb-4 block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    Words From The Heart
                </motion.span>

                <h2 className="heading-romantic text-5xl md:text-7xl mb-6">
                    Love Letters Vault
                </h2>

                <p className="text-poetic max-w-xl mx-auto">
                    Handwritten promises, whispered dreams, and love sealed in words
                </p>

                <div className="divider-romantic mt-8" />
            </motion.div>

            {/* Letters Grid */}
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {letters.map((letter, index) => (
                        <LetterEnvelope
                            key={letter.id}
                            letter={letter}
                            index={index}
                            onClick={() => setSelectedLetter(letter)}
                            isInView={isInView}
                        />
                    ))}

                    {/* Add New Letter Button */}
                    {canAdd && (
                        <motion.button
                            className="aspect-[4/5] rounded-2xl border-2 border-dashed border-blush-300 
                       flex flex-col items-center justify-center gap-4 text-blush-400
                       hover:border-romance-400 hover:text-romance-500 hover:bg-blush-50/50
                       transition-all duration-500"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 + letters.length * 0.1 }}
                            onClick={() => setIsCreating(true)}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Plus className="w-12 h-12" />
                            <span className="font-serif text-lg">Write a New Letter</span>
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Letter Reader Modal */}
            <AnimatePresence>
                {selectedLetter && (
                    <LetterReader
                        letter={selectedLetter}
                        onClose={() => setSelectedLetter(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

interface LetterEnvelopeProps {
    letter: LoveLetter
    index: number
    onClick: () => void
    isInView: boolean
}

function LetterEnvelope({ letter, index, onClick, isInView }: LetterEnvelopeProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="relative cursor-pointer group"
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
                delay: 0.2 + index * 0.15,
                duration: 0.8,
                ease: 'easeOut'
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Envelope Container */}
            <motion.div
                className="relative aspect-[4/5] perspective-1000"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
            >
                {/* Envelope Back */}
                <div className="absolute inset-0 bg-gradient-to-br from-ivory-100 to-champagne-100 
                      rounded-2xl shadow-romantic border border-champagne-200/50">
                    {/* Wax Seal */}
                    <motion.div
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
                        animate={isHovered ? { scale: 1.1, rotate: 10 } : {}}
                    >
                        <div className="w-16 h-16 rounded-full bg-romance-500 shadow-lg 
                          flex items-center justify-center border-4 border-romance-400">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                    </motion.div>
                </div>

                {/* Envelope Flap */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-1/2 origin-top"
                    animate={isHovered ? { rotateX: -30 } : { rotateX: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-champagne-100 to-ivory-100 
                      rounded-t-2xl border-b border-champagne-200/50"
                        style={{
                            clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
                        }}
                    />
                </motion.div>

                {/* Letter Content Preview */}
                <motion.div
                    className="absolute inset-x-4 top-8 bottom-24 bg-white rounded-lg shadow-sm p-4
                    flex flex-col"
                    animate={isHovered ? { y: -20, scale: 1.02 } : { y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Letter Header */}
                    <div className="flex items-start justify-between mb-3">
                        <Mail className="w-5 h-5 text-champagne-500" />
                        {letter.isPrivate && <Lock className="w-4 h-4 text-romance-400" />}
                    </div>

                    {/* Letter Title */}
                    <h3 className="font-script text-2xl text-romance-600 mb-1">
                        {letter.title}
                    </h3>

                    {/* Date */}
                    <span className="text-xs text-midnight-400 uppercase tracking-wider mb-3">
                        {letter.date}
                    </span>

                    {/* Preview */}
                    <p className="text-sm text-midnight-500 italic line-clamp-3 flex-1">
                        "{letter.preview}"
                    </p>

                    {/* From */}
                    <div className="mt-4 pt-3 border-t border-blush-100">
                        <span className="text-xs text-champagne-600">
                            With love, {letter.from}
                        </span>
                    </div>
                </motion.div>

                {/* Hover Glow */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        boxShadow: '0 0 40px rgba(255, 107, 138, 0.3)',
                    }}
                />
            </motion.div>
        </motion.div>
    )
}

interface LetterReaderProps {
    letter: LoveLetter
    onClose: () => void
}

function LetterReader({ letter, onClose }: LetterReaderProps) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-midnight-900/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            {/* Letter Paper */}
            <motion.div
                className="relative w-full max-w-2xl max-h-[85vh] overflow-auto"
                initial={{
                    opacity: 0,
                    scale: 0.8,
                    rotateX: 90,
                    y: 100
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    y: 0
                }}
                exit={{
                    opacity: 0,
                    scale: 0.9,
                    y: 50
                }}
                transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 200
                }}
            >
                <div className="letter-paper relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-blush-100 
                     flex items-center justify-center text-romance-500
                     hover:bg-romance-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <Heart className="w-8 h-8 text-romance-400 mx-auto mb-4 animate-heartbeat" />
                        <h2 className="font-script text-4xl text-romance-600 mb-2">
                            {letter.title}
                        </h2>
                        <span className="text-sm text-champagne-600 uppercase tracking-wider">
                            {letter.date}
                        </span>
                    </div>

                    <div className="divider-romantic" />

                    {/* Letter Content */}
                    <div className="mt-8 font-serif text-lg leading-loose text-midnight-700 whitespace-pre-line">
                        {letter.content}
                    </div>

                    {/* Signature */}
                    <div className="mt-12 text-right">
                        <span className="font-script text-3xl text-romance-500">
                            {letter.from}
                        </span>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute bottom-4 left-4">
                        <Heart className="w-6 h-6 text-blush-200" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
