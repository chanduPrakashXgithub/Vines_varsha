'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Heart, Film, ChevronLeft, ChevronRight, Plus, Edit2, Trash2, Save } from 'lucide-react'

interface VideoMemory {
    id: string
    _id?: string
    title: string
    url: string
    thumbnail?: string
    duration?: string
    description?: string
    date?: string
}

interface VideoMemoriesRoomProps {
    videos?: VideoMemory[]
    canEdit?: boolean
}

const defaultVideos: VideoMemory[] = [
    {
        id: '1',
        title: 'Our First Dance',
        url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        duration: '3:24',
        description: 'The moment we danced like no one was watching',
        date: 'The Night of Magic',
    },
    {
        id: '2',
        title: 'Beach Sunset',
        url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        duration: '2:15',
        description: 'Golden hour by the ocean',
        date: 'Summer Love',
    },
    {
        id: '3',
        title: 'Proposal Day',
        url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800',
        duration: '5:42',
        description: 'The day I asked forever',
        date: 'The Question',
    },
]

export function VideoMemoriesRoom({ videos: initialVideos, canEdit = false }: VideoMemoriesRoomProps) {
    const [videos, setVideos] = useState<VideoMemory[]>(initialVideos || defaultVideos)
    const [selectedVideo, setSelectedVideo] = useState<VideoMemory | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingVideo, setEditingVideo] = useState<VideoMemory | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    // Fetch videos from API
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/videos')
                if (response.ok) {
                    const data = await response.json()
                    if (data.length > 0) {
                        setVideos(data.map((v: VideoMemory & { _id: string }) => ({ ...v, id: v._id })))
                    }
                }
            } catch (error) {
                console.log('Using default videos', error)
            }
        }
        fetchVideos()
    }, [])

    const handleAddVideo = async (newVideo: Omit<VideoMemory, 'id'>) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVideo),
            })
            if (response.ok) {
                const created = await response.json()
                setVideos(prev => [{ ...created, id: created._id }, ...prev])
                setShowAddForm(false)
            }
        } catch (error) {
            console.error('Failed to add video:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateVideo = async (updatedVideo: VideoMemory) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/videos', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...updatedVideo, id: updatedVideo._id || updatedVideo.id }),
            })
            if (response.ok) {
                const updated = await response.json()
                setVideos(prev => prev.map(v =>
                    (v.id === updatedVideo.id || v._id === updatedVideo._id)
                        ? { ...updated, id: updated._id }
                        : v
                ))
                setEditingVideo(null)
            }
        } catch (error) {
            console.error('Failed to update video:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteVideo = async (videoId: string) => {
        if (!confirm('Are you sure you want to delete this video?')) return

        setIsLoading(true)
        try {
            const response = await fetch(`/api/videos?id=${videoId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                setVideos(prev => prev.filter(v => v.id !== videoId && v._id !== videoId))
            }
        } catch (error) {
            console.error('Failed to delete video:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSelectVideo = (video: VideoMemory, index: number) => {
        setSelectedVideo(video)
        setCurrentIndex(index)
    }

    const handlePrev = () => {
        const newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
        setSelectedVideo(videos[newIndex])
    }

    const handleNext = () => {
        const newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
        setSelectedVideo(videos[newIndex])
    }

    return (
        <section
            ref={sectionRef}
            className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900"
            id="videos"
        >
            {/* Stars Background for Night Mode Feel */}
            <div className="stars opacity-30" />

            {/* Ambient Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 107, 138, 0.5) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        top: '20%',
                        left: '10%',
                    }}
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        bottom: '10%',
                        right: '15%',
                    }}
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
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
                    <div className="w-20 h-20 rounded-full glass-dark flex items-center justify-center border border-champagne-500/30">
                        <Film className="w-10 h-10 text-champagne-400" />
                    </div>
                </motion.div>

                <motion.span
                    className="text-champagne-400 uppercase tracking-[0.3em] text-sm font-sans mb-4 block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    Cinematic Memories
                </motion.span>

                <h2 className="font-script text-5xl md:text-7xl text-blush-200 mb-6">
                    Video Room
                </h2>

                <p className="font-serif text-lg text-midnight-300 italic max-w-xl mx-auto">
                    Relive our most precious moments in motion
                </p>

                <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-500/50 to-transparent mx-auto mt-8" />

                {/* Add Video Button */}
                {canEdit && (
                    <motion.button
                        onClick={() => setShowAddForm(true)}
                        className="mt-8 flex items-center gap-2 px-6 py-3 mx-auto rounded-full bg-champagne-500 text-midnight-900 hover:bg-champagne-400 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-sans text-sm">Add Video</span>
                    </motion.button>
                )}
            </motion.div>

            {/* Add Video Form Modal */}
            <AnimatePresence>
                {showAddForm && (
                    <VideoFormModal
                        onSave={handleAddVideo}
                        onClose={() => setShowAddForm(false)}
                        isLoading={isLoading}
                    />
                )}
            </AnimatePresence>

            {/* Edit Video Form Modal */}
            <AnimatePresence>
                {editingVideo && (
                    <VideoFormModal
                        video={editingVideo}
                        onSave={(data) => handleUpdateVideo({ ...editingVideo, ...data })}
                        onClose={() => setEditingVideo(null)}
                        isLoading={isLoading}
                    />
                )}
            </AnimatePresence>

            {/* Video Grid */}
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {videos.map((video, index) => (
                        <VideoCard
                            key={video.id || video._id}
                            video={video}
                            index={index}
                            onClick={() => handleSelectVideo(video, index)}
                            isInView={isInView}
                            canEdit={canEdit}
                            onEdit={() => setEditingVideo(video)}
                            onDelete={() => handleDeleteVideo(video._id || video.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Video Player Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoPlayer
                        video={selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        hasMultiple={videos.length > 1}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

interface VideoCardProps {
    video: VideoMemory
    index: number
    onClick: () => void
    isInView: boolean
    canEdit?: boolean
    onEdit?: () => void
    onDelete?: () => void
}

function VideoCard({ video, index, onClick, isInView, canEdit, onEdit, onDelete }: VideoCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="relative aspect-video cursor-pointer group"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                delay: 0.2 + index * 0.15,
                duration: 0.8,
                ease: 'easeOut',
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Edit/Delete Buttons */}
            {canEdit && isHovered && (
                <div className="absolute top-3 right-3 z-20 flex gap-2">
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

            {/* Thumbnail Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {/* Thumbnail Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-midnight-900/40 to-transparent" />

                {/* Glass Border Effect */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-champagne-400/30 transition-colors duration-500" />

                {/* Play Button */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={isHovered ? { scale: 1 } : { scale: 0.9 }}
                >
                    <motion.div
                        className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md 
                     flex items-center justify-center border border-white/30
                     group-hover:bg-romance-500/80 group-hover:border-romance-400
                     transition-all duration-500"
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    >
                        <Play className="w-10 h-10 text-white ml-1" />
                    </motion.div>
                </motion.div>

                {/* Duration Badge */}
                {video.duration && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-midnight-900/80 
                        text-white text-xs backdrop-blur-sm">
                        {video.duration}
                    </div>
                )}

                {/* Content */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0.8, y: isHovered ? 0 : 10 }}
                >
                    {video.date && (
                        <span className="text-xs text-champagne-300 uppercase tracking-wider mb-2 block">
                            {video.date}
                        </span>
                    )}
                    <h3 className="font-serif text-xl text-white mb-2">{video.title}</h3>
                    {video.description && (
                        <p className="text-sm text-midnight-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {video.description}
                        </p>
                    )}
                </motion.div>

                {/* Heart Icon */}
                <motion.div
                    className="absolute top-4 left-4"
                    animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                >
                    <Heart className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-romance-400 fill-romance-400' : 'text-white/50'
                        }`} />
                </motion.div>
            </div>
        </motion.div>
    )
}

interface VideoPlayerProps {
    video: VideoMemory
    onClose: () => void
    onPrev: () => void
    onNext: () => void
    hasMultiple: boolean
}

function VideoPlayer({ video, onClose, onPrev, onNext, hasMultiple }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime
            const duration = videoRef.current.duration
            setProgress((current / duration) * 100)
        }
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const percentage = x / rect.width
            videoRef.current.currentTime = percentage * videoRef.current.duration
        }
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-midnight-950/98 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full glass-dark
                 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            {hasMultiple && (
                <>
                    <button
                        onClick={onPrev}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full glass-dark
                     flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={onNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full glass-dark
                     flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </>
            )}

            {/* Video Container */}
            <motion.div
                className="relative z-40 w-full max-w-5xl mx-6"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
            >
                {/* Video Title */}
                <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="font-script text-3xl text-blush-200 mb-2">{video.title}</h2>
                    {video.description && (
                        <p className="text-midnight-300 text-sm italic">{video.description}</p>
                    )}
                </motion.div>

                {/* Video Player */}
                <div className="relative rounded-2xl overflow-hidden bg-midnight-900">
                    <video
                        ref={videoRef}
                        src={video.url}
                        className="w-full aspect-video"
                        autoPlay
                        onTimeUpdate={handleTimeUpdate}
                        poster={video.thumbnail}
                    />

                    {/* Custom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-midnight-950/90 to-transparent">
                        {/* Progress Bar */}
                        <div
                            className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer group"
                            onClick={handleProgressClick}
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-blush-400 to-romance-500 rounded-full relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white 
                              opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={togglePlay}
                                    className="w-10 h-10 rounded-full glass-dark flex items-center justify-center
                           text-white hover:bg-white/20 transition-colors"
                                >
                                    {isPlaying ? (
                                        <Pause className="w-5 h-5" />
                                    ) : (
                                        <Play className="w-5 h-5 ml-0.5" />
                                    )}
                                </button>

                                <button
                                    onClick={toggleMute}
                                    className="w-10 h-10 rounded-full glass-dark flex items-center justify-center
                           text-white hover:bg-white/20 transition-colors"
                                >
                                    {isMuted ? (
                                        <VolumeX className="w-5 h-5" />
                                    ) : (
                                        <Volume2 className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            <button
                                onClick={() => videoRef.current?.requestFullscreen()}
                                className="w-10 h-10 rounded-full glass-dark flex items-center justify-center
                         text-white hover:bg-white/20 transition-colors"
                            >
                                <Maximize2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

// Video Form Modal for Add/Edit
interface VideoFormModalProps {
    video?: VideoMemory
    onSave: (data: Omit<VideoMemory, 'id'>) => void
    onClose: () => void
    isLoading: boolean
}

function VideoFormModal({ video, onSave, onClose, isLoading }: VideoFormModalProps) {
    const [title, setTitle] = useState(video?.title || '')
    const [url, setUrl] = useState(video?.url || '')
    const [thumbnail, setThumbnail] = useState(video?.thumbnail || '')
    const [duration, setDuration] = useState(video?.duration || '')
    const [description, setDescription] = useState(video?.description || '')
    const [date, setDate] = useState(video?.date || '')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!url || !title) return

        onSave({
            title,
            url,
            thumbnail,
            duration,
            description,
            date,
        })
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-900/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-midnight-800 border border-midnight-600 rounded-3xl p-8 max-w-md w-full shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-2xl text-blush-100">
                        {video ? 'Edit Video' : 'Add New Video'}
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-midnight-700 rounded-full text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-midnight-300 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Our First Dance..."
                            className="w-full px-4 py-3 bg-midnight-700 border border-midnight-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-midnight-300 mb-2">
                            Video URL (Cloudinary) *
                        </label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://res.cloudinary.com/.../video.mp4"
                            className="w-full px-4 py-3 bg-midnight-700 border border-midnight-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-midnight-300 mb-2">
                            Thumbnail URL
                        </label>
                        <input
                            type="url"
                            value={thumbnail}
                            onChange={(e) => setThumbnail(e.target.value)}
                            placeholder="https://res.cloudinary.com/.../thumb.jpg"
                            className="w-full px-4 py-3 bg-midnight-700 border border-midnight-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-midnight-300 mb-2">
                                Duration
                            </label>
                            <input
                                type="text"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="3:24"
                                className="w-full px-4 py-3 bg-midnight-700 border border-midnight-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-midnight-300 mb-2">
                                Date / Occasion
                            </label>
                            <input
                                type="text"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Summer 2024"
                                className="w-full px-4 py-3 bg-midnight-700 border border-midnight-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-midnight-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="A beautiful moment..."
                            rows={3}
                            className="w-full px-4 py-3 bg-midnight-700 border border-midnight-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-500 resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-midnight-500 text-midnight-300 rounded-full hover:bg-midnight-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !url || !title}
                            className="flex-1 px-6 py-3 bg-champagne-500 text-midnight-900 rounded-full hover:bg-champagne-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span>Saving...</span>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>{video ? 'Update' : 'Add Video'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    )
}
