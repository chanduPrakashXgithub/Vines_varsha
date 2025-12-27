'use client'

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'

interface AudioContextType {
    isPlaying: boolean
    volume: number
    isMuted: boolean
    togglePlay: () => void
    setVolume: (volume: number) => void
    toggleMute: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolumeState] = useState(0.3)
    const [isMuted, setIsMuted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        // Create audio element on client side only
        const musicUrl = process.env.NEXT_PUBLIC_BG_MUSIC_URL || '/audio/romantic-bg.mp3'

        const audio = new Audio(musicUrl)
        audio.loop = true
        audio.volume = volume
        audio.preload = 'auto'

        audio.addEventListener('canplaythrough', () => {
            setIsLoaded(true)
        })

        audio.addEventListener('error', () => {
            console.log('Background music not available')
        })

        audioRef.current = audio

        return () => {
            audio.pause()
            audio.src = ''
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume
        }
    }, [volume, isMuted])

    const togglePlay = useCallback(() => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play().catch(() => {
                // Autoplay blocked, that's okay
                console.log('Autoplay blocked - user interaction needed')
            })
        }
        setIsPlaying(!isPlaying)
    }, [isPlaying])

    const setVolume = useCallback((newVolume: number) => {
        setVolumeState(Math.max(0, Math.min(1, newVolume)))
    }, [])

    const toggleMute = useCallback(() => {
        setIsMuted(!isMuted)
    }, [isMuted])

    return (
        <AudioContext.Provider
            value={{
                isPlaying,
                volume,
                isMuted,
                togglePlay,
                setVolume,
                toggleMute,
            }}
        >
            {children}
        </AudioContext.Provider>
    )
}

export function useAudio() {
    const context = useContext(AudioContext)
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider')
    }
    return context
}
