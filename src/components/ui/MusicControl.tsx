'use client'

import { useAudio } from '@/components/providers/AudioProvider'
import { Volume2, VolumeX, Music } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function MusicControl() {
    const { isPlaying, isMuted, togglePlay, toggleMute, volume, setVolume } = useAudio()
    const [showVolume, setShowVolume] = useState(false)

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
        >
            {/* Volume Slider */}
            <AnimatePresence>
                {showVolume && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="glass rounded-full px-4 py-2 flex items-center gap-3"
                    >
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-20 accent-romance-500"
                        />
                        <button
                            onClick={toggleMute}
                            className="text-midnight-600 hover:text-romance-500 transition-colors"
                        >
                            {isMuted ? (
                                <VolumeX className="w-5 h-5" />
                            ) : (
                                <Volume2 className="w-5 h-5" />
                            )}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Music Button */}
            <motion.button
                onClick={() => {
                    togglePlay()
                    setShowVolume(true)
                }}
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setTimeout(() => setShowVolume(false), 2000)}
                className={`
          w-14 h-14 rounded-full glass flex items-center justify-center
          transition-all duration-500
          ${isPlaying ? 'shadow-glow-pink' : 'shadow-glass'}
          hover:scale-110 hover:shadow-glow-pink
        `}
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.95 }}
            >
                <Music
                    className={`w-6 h-6 transition-colors duration-300 ${isPlaying ? 'text-romance-500' : 'text-midnight-500'
                        }`}
                />

                {/* Playing Indicator */}
                {isPlaying && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-romance-400"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
            </motion.button>
        </motion.div>
    )
}
