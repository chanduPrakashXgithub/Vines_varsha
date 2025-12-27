'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Lock, Unlock, Heart, Plus, Calendar, MessageCircle, X, Check } from 'lucide-react'

interface PrivateMessage {
    id: string
    content: string
    date: string
    unlockDate?: string
    type: 'message' | 'anniversary' | 'timecapsule'
}

interface PrivateSpaceProps {
    isAuthenticated?: boolean
    onAuthenticate?: (password: string) => Promise<boolean>
    messages?: PrivateMessage[]
    onAddMessage?: (message: Omit<PrivateMessage, 'id'>) => void
}

export function PrivateSpace({
    isAuthenticated: initialAuth = false,
    onAuthenticate,
    messages = [],
    onAddMessage,
}: PrivateSpaceProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuth)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            if (onAuthenticate) {
                const success = await onAuthenticate(password)
                if (success) {
                    setIsAuthenticated(true)
                } else {
                    setError('Incorrect password. This space is just for us.')
                }
            } else {
                // Use the auth API to verify password
                const response = await fetch('/api/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password }),
                })
                const data = await response.json()

                if (data.authenticated) {
                    setIsAuthenticated(true)
                } else {
                    setError('Incorrect password. This space is just for us.')
                }
            }
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section
            ref={sectionRef}
            className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900"
            id="private"
        >
            {/* Stars Background */}
            <div className="stars" />

            {/* Ambient Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 107, 138, 0.4) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        top: '30%',
                        left: '20%',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
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
                        <div className="w-20 h-20 rounded-full glass-dark flex items-center justify-center border border-champagne-500/30">
                            {isAuthenticated ? (
                                <Unlock className="w-10 h-10 text-champagne-400" />
                            ) : (
                                <Lock className="w-10 h-10 text-champagne-400" />
                            )}
                        </div>
                    </motion.div>

                    <motion.span
                        className="text-champagne-400 uppercase tracking-[0.3em] text-sm font-sans mb-4 block"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        Just For Us
                    </motion.span>

                    <h2 className="font-script text-5xl md:text-7xl text-blush-200 mb-6">
                        Private Space
                    </h2>

                    <p className="font-serif text-lg text-midnight-300 italic max-w-xl mx-auto">
                        {isAuthenticated
                            ? 'Our secret garden of love and promises'
                            : 'A sacred space protected by our secret'}
                    </p>

                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-500/50 to-transparent mx-auto mt-8" />
                </motion.div>

                <AnimatePresence mode="wait">
                    {!isAuthenticated ? (
                        <LoginForm
                            key="login"
                            password={password}
                            setPassword={setPassword}
                            error={error}
                            isLoading={isLoading}
                            onSubmit={handleLogin}
                        />
                    ) : (
                        <PrivateContent
                            key="content"
                            messages={messages}
                            onAddMessage={onAddMessage}
                            showAddForm={showAddForm}
                            setShowAddForm={setShowAddForm}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

interface LoginFormProps {
    password: string
    setPassword: (value: string) => void
    error: string
    isLoading: boolean
    onSubmit: (e: React.FormEvent) => void
}

function LoginForm({ password, setPassword, error, isLoading, onSubmit }: LoginFormProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
        >
            <div className="glass-dark rounded-3xl p-8 md:p-10 border border-champagne-500/20">
                <div className="text-center mb-8">
                    <Heart className="w-12 h-12 text-romance-400 mx-auto mb-4" />
                    <p className="text-midnight-200 font-serif">
                        Enter our secret password to unlock this space
                    </p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="relative mb-6">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Our secret..."
                            className="w-full px-6 py-4 bg-midnight-800/50 border border-midnight-600 rounded-full
                       text-white placeholder-midnight-400 text-center font-serif
                       focus:outline-none focus:border-champagne-500/50 focus:ring-2 focus:ring-champagne-500/20
                       transition-all duration-300"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-500" />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-romance-400 text-sm text-center mb-4"
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 rounded-full bg-gradient-to-r from-blush-500 to-romance-500
                     text-white font-sans uppercase tracking-widest text-sm
                     hover:shadow-glow-pink transition-all duration-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? 'Unlocking...' : 'Unlock Our Space'}
                    </motion.button>
                </form>

                <p className="text-xs text-midnight-500 text-center mt-6">
                    Hint: The password is our special word 💕
                </p>
            </div>
        </motion.div>
    )
}

interface PrivateContentProps {
    messages: PrivateMessage[]
    onAddMessage?: (message: Omit<PrivateMessage, 'id'>) => void
    showAddForm: boolean
    setShowAddForm: (show: boolean) => void
}

function PrivateContent({ messages, onAddMessage, showAddForm, setShowAddForm }: PrivateContentProps) {
    const defaultMessages: PrivateMessage[] = [
        {
            id: '1',
            content: 'I promise to love you more with each passing day. You are my today and all of my tomorrows.',
            date: 'Wedding Day',
            type: 'message',
        },
        {
            id: '2',
            content: 'Open this on our first anniversary. Inside are my dreams for our future together.',
            date: 'For Our Anniversary',
            unlockDate: '2025-12-31',
            type: 'timecapsule',
        },
        {
            id: '3',
            content: 'Remember this day when we first said "I love you"? That was the moment I knew you were my forever.',
            date: 'A Memory',
            type: 'anniversary',
        },
    ]

    const displayMessages = messages.length > 0 ? messages : defaultMessages

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
        >
            {/* Welcome Message */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <p className="text-champagne-300 font-serif text-lg">
                    Welcome to our secret garden, my love 💕
                </p>
            </motion.div>

            {/* Messages Grid */}
            <div className="grid gap-6 mb-8">
                {displayMessages.map((message, index) => (
                    <MessageCard key={message.id} message={message} index={index} />
                ))}
            </div>

            {/* Add New Message Button */}
            {onAddMessage && (
                <motion.button
                    onClick={() => setShowAddForm(true)}
                    className="w-full py-4 rounded-2xl border-2 border-dashed border-midnight-600
                   text-midnight-400 font-serif flex items-center justify-center gap-3
                   hover:border-champagne-500/50 hover:text-champagne-400
                   transition-all duration-500"
                    whileHover={{ scale: 1.01 }}
                >
                    <Plus className="w-5 h-5" />
                    <span>Add a New Memory or Promise</span>
                </motion.button>
            )}

            {/* Add Form Modal */}
            <AnimatePresence>
                {showAddForm && (
                    <AddMessageForm
                        onClose={() => setShowAddForm(false)}
                        onAdd={(message) => {
                            onAddMessage?.(message)
                            setShowAddForm(false)
                        }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function MessageCard({ message, index }: { message: PrivateMessage; index: number }) {
    const [isLocked, setIsLocked] = useState(
        message.unlockDate ? new Date(message.unlockDate) > new Date() : false
    )

    const icons = {
        message: MessageCircle,
        anniversary: Heart,
        timecapsule: Calendar,
    }

    const Icon = icons[message.type]

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="relative"
        >
            <div className={`glass-dark rounded-2xl p-6 md:p-8 border transition-all duration-500
                    ${isLocked
                    ? 'border-midnight-600 opacity-60'
                    : 'border-champagne-500/20 hover:border-champagne-500/40'}`}
            >
                {/* Icon & Type */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-midnight-800 flex items-center justify-center">
                            <Icon className={`w-5 h-5 ${isLocked ? 'text-midnight-500' : 'text-romance-400'}`} />
                        </div>
                        <span className="text-xs text-champagne-400 uppercase tracking-wider">
                            {message.date}
                        </span>
                    </div>

                    {isLocked && (
                        <div className="flex items-center gap-2 text-midnight-500 text-xs">
                            <Lock className="w-4 h-4" />
                            <span>Unlocks {new Date(message.unlockDate!).toLocaleDateString()}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <p className={`font-serif text-lg leading-relaxed ${isLocked ? 'text-midnight-600 blur-sm select-none' : 'text-midnight-200'
                    }`}>
                    {isLocked ? 'This message is waiting for the perfect moment...' : message.content}
                </p>

                {/* Unlock Button for Time Capsule */}
                {isLocked && message.unlockDate && new Date(message.unlockDate) <= new Date() && (
                    <motion.button
                        onClick={() => setIsLocked(false)}
                        className="mt-4 px-6 py-2 rounded-full bg-champagne-500/20 text-champagne-400
                     hover:bg-champagne-500/30 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                    >
                        Unlock This Message
                    </motion.button>
                )}
            </div>
        </motion.div>
    )
}

interface AddMessageFormProps {
    onClose: () => void
    onAdd: (message: Omit<PrivateMessage, 'id'>) => void
}

function AddMessageForm({ onClose, onAdd }: AddMessageFormProps) {
    const [content, setContent] = useState('')
    const [type, setType] = useState<PrivateMessage['type']>('message')
    const [date, setDate] = useState('')
    const [unlockDate, setUnlockDate] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAdd({
            content,
            type,
            date: date || new Date().toLocaleDateString(),
            unlockDate: unlockDate || undefined,
        })
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="absolute inset-0 bg-midnight-950/90 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                className="relative z-10 w-full max-w-lg glass-dark rounded-3xl p-8 border border-champagne-500/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-midnight-800
                   flex items-center justify-center text-midnight-400 hover:text-white
                   transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="font-script text-3xl text-blush-200 mb-6 text-center">
                    Add a New Memory
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Type Selection */}
                    <div className="flex gap-4 justify-center">
                        {(['message', 'anniversary', 'timecapsule'] as const).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                className={`px-4 py-2 rounded-full text-sm transition-all ${type === t
                                    ? 'bg-romance-500 text-white'
                                    : 'bg-midnight-800 text-midnight-300 hover:bg-midnight-700'
                                    }`}
                            >
                                {t === 'message' ? 'Message' : t === 'anniversary' ? 'Anniversary' : 'Time Capsule'}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your message from the heart..."
                        rows={4}
                        className="w-full px-4 py-3 bg-midnight-800/50 border border-midnight-600 rounded-xl
                     text-white placeholder-midnight-400 font-serif
                     focus:outline-none focus:border-champagne-500/50 resize-none"
                        required
                    />

                    {/* Date Label */}
                    <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Label (e.g., 'Our Anniversary')"
                        className="w-full px-4 py-3 bg-midnight-800/50 border border-midnight-600 rounded-xl
                     text-white placeholder-midnight-400 font-serif
                     focus:outline-none focus:border-champagne-500/50"
                    />

                    {/* Unlock Date for Time Capsule */}
                    {type === 'timecapsule' && (
                        <div>
                            <label className="text-xs text-midnight-400 mb-2 block">
                                Unlock Date (for time capsule)
                            </label>
                            <input
                                type="date"
                                value={unlockDate}
                                onChange={(e) => setUnlockDate(e.target.value)}
                                className="w-full px-4 py-3 bg-midnight-800/50 border border-midnight-600 rounded-xl
                         text-white font-serif
                         focus:outline-none focus:border-champagne-500/50"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        className="w-full py-4 rounded-full bg-gradient-to-r from-blush-500 to-romance-500
                     text-white font-sans uppercase tracking-widest text-sm
                     hover:shadow-glow-pink transition-all duration-500
                     flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Check className="w-5 h-5" />
                        <span>Save Memory</span>
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    )
}
