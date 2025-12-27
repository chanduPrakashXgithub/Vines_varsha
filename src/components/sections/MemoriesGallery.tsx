'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Heart, X, ZoomIn, Play, ChevronLeft, ChevronRight, Grid, Maximize2, Plus, Edit2, Trash2, Save } from 'lucide-react'
import Image from 'next/image'

interface Memory {
    id: string
    _id?: string
    type: 'image' | 'video'
    url: string
    thumbnail?: string
    caption?: string
    date?: string
    poetry?: string
    isFavorite?: boolean
}

interface MemoriesGalleryProps {
    memories?: Memory[]
    canEdit?: boolean
}

const defaultMemories: Memory[] = [
    {
        id: '1',
        type: 'image',
        url: 'https://res.cloudinary.com/di76jopyu/image/upload/v1766843619/vines_1_ekm0va.jpg',
        caption: 'Where it all began',
        date: 'Our first chapter',
        poetry: 'Two souls, one destiny...',
    },
    {
        id: '2',
        type: 'image',
        url: 'https://res.cloudinary.com/di76jopyu/image/upload/v1766843704/vines_2_lfokmf.jpg',
        caption: 'Every moment with you',
        date: 'A beautiful memory',
        poetry: 'In your eyes, I found forever...',
    },
    {
        id: '3',
        type: 'image',
        url: 'https://res.cloudinary.com/di76jopyu/image/upload/v1766843727/vines_3_ffobvd.jpg',
        caption: 'Love in every glance',
        date: 'Stolen moments',
        poetry: 'Your smile is my sunshine...',
    },
    {
        id: '4',
        type: 'image',
        url: 'https://res.cloudinary.com/di76jopyu/image/upload/v1766843759/vines_4_sy7b7d.jpg',
        caption: 'Together forever',
        date: 'Our journey',
        poetry: 'Hand in hand, heart to heart...',
    },
    {
        id: '5',
        type: 'image',
        url: 'https://res.cloudinary.com/di76jopyu/image/upload/v1766843929/vines_5_ebyle6.jpg',
        caption: 'My favorite place',
        date: 'Always with you',
        poetry: 'Home is wherever you are...',
    },
]

export function MemoriesGallery({ memories: initialMemories, canEdit = false }: MemoriesGalleryProps) {
    const [memories, setMemories] = useState<Memory[]>(initialMemories || defaultMemories)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [viewMode, setViewMode] = useState<'masonry' | 'slideshow'>('masonry')
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingMemory, setEditingMemory] = useState<Memory | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    // Fetch memories from API
    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const response = await fetch('/api/memories?type=image')
                if (response.ok) {
                    const data = await response.json()
                    if (data.length > 0) {
                        setMemories(data.map((m: Memory & { _id: string }) => ({ ...m, id: m._id })))
                    }
                }
            } catch (error) {
                console.log('Using default memories', error)
            }
        }
        fetchMemories()
    }, [])

    const handleAddMemory = async (newMemory: Omit<Memory, 'id'>) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/memories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMemory),
            })
            if (response.ok) {
                const created = await response.json()
                setMemories(prev => [{ ...created, id: created._id }, ...prev])
                setShowAddForm(false)
            }
        } catch (error) {
            console.error('Failed to add memory:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateMemory = async (updatedMemory: Memory) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/memories', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...updatedMemory, id: updatedMemory._id || updatedMemory.id }),
            })
            if (response.ok) {
                const updated = await response.json()
                setMemories(prev => prev.map(m =>
                    (m.id === updatedMemory.id || m._id === updatedMemory._id)
                        ? { ...updated, id: updated._id }
                        : m
                ))
                setEditingMemory(null)
            }
        } catch (error) {
            console.error('Failed to update memory:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteMemory = async (memoryId: string) => {
        if (!confirm('Are you sure you want to delete this memory?')) return

        setIsLoading(true)
        try {
            const response = await fetch(`/api/memories?id=${memoryId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                setMemories(prev => prev.filter(m => m.id !== memoryId && m._id !== memoryId))
            }
        } catch (error) {
            console.error('Failed to delete memory:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handlePrev = () => {
        if (selectedIndex === null) return
        setSelectedIndex(selectedIndex === 0 ? memories.length - 1 : selectedIndex - 1)
    }

    const handleNext = () => {
        if (selectedIndex === null) return
        setSelectedIndex(selectedIndex === memories.length - 1 ? 0 : selectedIndex + 1)
    }

    return (
        <section
            ref={sectionRef}
            className="relative py-20 md:py-32 overflow-hidden"
            id="gallery"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-ivory-50 via-blush-50/20 to-ivory-50" />

            {/* Section Header */}
            <motion.div
                className="text-center mb-12 md:mb-20 px-6 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
            >
                <motion.span
                    className="text-champagne-600 uppercase tracking-[0.3em] text-sm font-sans mb-4 block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    Captured Moments
                </motion.span>

                <h2 className="heading-romantic text-5xl md:text-7xl mb-6">
                    Our Memories
                </h2>

                <p className="text-poetic max-w-xl mx-auto">
                    Every photograph is a love letter frozen in time
                </p>

                <div className="divider-romantic mt-8" />

                {/* View Mode Toggle + Add Button */}
                <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
                    <button
                        onClick={() => setViewMode('masonry')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                      ${viewMode === 'masonry'
                                ? 'bg-romance-500 text-white'
                                : 'glass text-midnight-600 hover:bg-white/50'}`}
                    >
                        <Grid className="w-4 h-4" />
                        <span className="text-sm">Gallery</span>
                    </button>
                    <button
                        onClick={() => setViewMode('slideshow')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                      ${viewMode === 'slideshow'
                                ? 'bg-romance-500 text-white'
                                : 'glass text-midnight-600 hover:bg-white/50'}`}
                    >
                        <Maximize2 className="w-4 h-4" />
                        <span className="text-sm">Slideshow</span>
                    </button>

                    {canEdit && (
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-champagne-500 text-white hover:bg-champagne-600 transition-all duration-300"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="text-sm">Add Memory</span>
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Add Memory Form Modal */}
            <AnimatePresence>
                {showAddForm && (
                    <MemoryFormModal
                        onSave={handleAddMemory}
                        onClose={() => setShowAddForm(false)}
                        isLoading={isLoading}
                    />
                )}
            </AnimatePresence>

            {/* Edit Memory Form Modal */}
            <AnimatePresence>
                {editingMemory && (
                    <MemoryFormModal
                        memory={editingMemory}
                        onSave={(data) => handleUpdateMemory({ ...editingMemory, ...data })}
                        onClose={() => setEditingMemory(null)}
                        isLoading={isLoading}
                    />
                )}
            </AnimatePresence>

            {/* Gallery Content */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <AnimatePresence mode="wait">
                    {viewMode === 'masonry' ? (
                        <motion.div
                            key="masonry"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                        >
                            {memories.map((memory, index) => (
                                <MemoryCard
                                    key={memory.id || memory._id}
                                    memory={memory}
                                    index={index}
                                    onClick={() => setSelectedIndex(index)}
                                    isInView={isInView}
                                    canEdit={canEdit}
                                    onEdit={() => setEditingMemory(memory)}
                                    onDelete={() => handleDeleteMemory(memory._id || memory.id)}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <SlideshowView
                            memories={memories}
                            currentIndex={selectedIndex ?? 0}
                            onIndexChange={setSelectedIndex}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedIndex !== null && viewMode === 'masonry' && (
                    <Lightbox
                        memories={memories}
                        currentIndex={selectedIndex}
                        onClose={() => setSelectedIndex(null)}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

interface MemoryCardProps {
    memory: Memory
    index: number
    onClick: () => void
    isInView: boolean
    canEdit?: boolean
    onEdit?: () => void
    onDelete?: () => void
}

function MemoryCard({ memory, index, onClick, isInView, canEdit, onEdit, onDelete }: MemoryCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    // Varying heights for masonry effect
    const heights = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/2]']
    const heightClass = heights[index % heights.length]

    return (
        <motion.div
            className={`relative ${heightClass} break-inside-avoid mb-6 cursor-pointer group`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                delay: 0.1 + index * 0.1,
                duration: 0.8,
                ease: 'easeOut',
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Edit/Delete Buttons */}
            {canEdit && isHovered && (
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                        <Edit2 className="w-4 h-4 text-midnight-700" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                        className="p-2 bg-white/90 rounded-full hover:bg-romance-500 hover:text-white transition-colors shadow-lg"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Image Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden photo-frame">
                <Image
                    src={memory.url}
                    alt={memory.caption || 'Memory'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-midnight-900/80 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Content Overlay */}
                <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                >
                    {memory.date && (
                        <span className="text-xs text-champagne-300 uppercase tracking-wider mb-2">
                            {memory.date}
                        </span>
                    )}
                    {memory.caption && (
                        <h3 className="font-serif text-xl text-white mb-2">
                            {memory.caption}
                        </h3>
                    )}
                    {memory.poetry && (
                        <p className="text-sm text-blush-200 italic">
                            "{memory.poetry}"
                        </p>
                    )}
                </motion.div>

                {/* Heart Beat Animation on Hover */}
                <motion.div
                    className="absolute top-4 right-4"
                    animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                >
                    <Heart
                        className={`w-6 h-6 transition-colors duration-300 ${isHovered ? 'text-romance-400 fill-romance-400' : 'text-white/50'
                            }`}
                    />
                </motion.div>

                {/* Video Indicator */}
                {memory.type === 'video' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm 
                       flex items-center justify-center"
                            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        >
                            <Play className="w-8 h-8 text-white ml-1" />
                        </motion.div>
                    </div>
                )}

                {/* Zoom Icon */}
                <motion.div
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                >
                    <ZoomIn className="w-5 h-5 text-white" />
                </motion.div>
            </div>
        </motion.div>
    )
}

interface SlideshowViewProps {
    memories: Memory[]
    currentIndex: number
    onIndexChange: (index: number) => void
}

function SlideshowView({ memories, currentIndex, onIndexChange }: SlideshowViewProps) {
    const current = memories[currentIndex]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
        >
            {/* Main Display */}
            <div className="relative aspect-[16/9] max-h-[70vh] rounded-3xl overflow-hidden mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={current.url}
                            alt={current.caption || 'Memory'}
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/60 via-transparent to-transparent" />

                        {/* Caption */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 p-8 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {current.date && (
                                <span className="text-champagne-300 uppercase tracking-widest text-sm mb-2 block">
                                    {current.date}
                                </span>
                            )}
                            {current.caption && (
                                <h3 className="font-serif text-3xl text-white mb-3">
                                    {current.caption}
                                </h3>
                            )}
                            {current.poetry && (
                                <p className="text-blush-200 italic">"{current.poetry}"</p>
                            )}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={() => onIndexChange(currentIndex === 0 ? memories.length - 1 : currentIndex - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                   glass flex items-center justify-center text-white
                   hover:bg-white/30 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => onIndexChange(currentIndex === memories.length - 1 ? 0 : currentIndex + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                   glass flex items-center justify-center text-white
                   hover:bg-white/30 transition-colors"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex justify-center gap-3 mt-6 overflow-x-auto pb-4">
                {memories.map((memory, index) => (
                    <motion.button
                        key={memory.id}
                        onClick={() => onIndexChange(index)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0
                      transition-all duration-300 ${index === currentIndex
                                ? 'ring-2 ring-romance-400 ring-offset-2'
                                : 'opacity-60 hover:opacity-100'
                            }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Image
                            src={memory.url}
                            alt={memory.caption || 'Thumbnail'}
                            fill
                            className="object-cover"
                        />
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}

interface LightboxProps {
    memories: Memory[]
    currentIndex: number
    onClose: () => void
    onPrev: () => void
    onNext: () => void
}

function Lightbox({ memories, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
    const current = memories[currentIndex]

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-midnight-950/95 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full glass
                 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
                onClick={onPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full glass
                 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={onNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full glass
                 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    className="relative z-40 max-w-6xl max-h-[85vh] mx-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                >
                    {current.type === 'image' ? (
                        <div className="relative">
                            <Image
                                src={current.url}
                                alt={current.caption || 'Memory'}
                                width={1200}
                                height={800}
                                className="rounded-2xl max-h-[70vh] w-auto object-contain"
                                priority
                            />
                        </div>
                    ) : (
                        <video
                            src={current.url}
                            controls
                            className="rounded-2xl max-h-[70vh]"
                            autoPlay
                        />
                    )}

                    {/* Caption */}
                    <motion.div
                        className="absolute -bottom-16 left-0 right-0 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {current.caption && (
                            <p className="font-serif text-xl text-white mb-2">{current.caption}</p>
                        )}
                        {current.poetry && (
                            <p className="text-blush-300 italic">"{current.poetry}"</p>
                        )}
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
                <span className="text-white/60 text-sm">
                    {currentIndex + 1} / {memories.length}
                </span>
            </div>
        </motion.div>
    )
}

// Memory Form Modal for Add/Edit
interface MemoryFormModalProps {
    memory?: Memory
    onSave: (data: Omit<Memory, 'id'>) => void
    onClose: () => void
    isLoading: boolean
}

function MemoryFormModal({ memory, onSave, onClose, isLoading }: MemoryFormModalProps) {
    const [url, setUrl] = useState(memory?.url || '')
    const [caption, setCaption] = useState(memory?.caption || '')
    const [date, setDate] = useState(memory?.date || '')
    const [poetry, setPoetry] = useState(memory?.poetry || '')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!url) return

        onSave({
            type: 'image',
            url,
            caption,
            date,
            poetry,
        })
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-900/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-2xl text-midnight-800">
                        {memory ? 'Edit Memory' : 'Add New Memory'}
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-midnight-600 mb-2">
                            Image URL (Cloudinary) *
                        </label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://res.cloudinary.com/..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-romance-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-midnight-600 mb-2">
                            Caption
                        </label>
                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Our special moment..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-romance-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-midnight-600 mb-2">
                            Date / Occasion
                        </label>
                        <input
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Our Anniversary, First Date..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-romance-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-midnight-600 mb-2">
                            Poetry / Quote
                        </label>
                        <textarea
                            value={poetry}
                            onChange={(e) => setPoetry(e.target.value)}
                            placeholder="A little note about this memory..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-romance-400 resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !url}
                            className="flex-1 px-6 py-3 bg-romance-500 text-white rounded-full hover:bg-romance-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span>Saving...</span>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>{memory ? 'Update' : 'Add Memory'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    )
}
