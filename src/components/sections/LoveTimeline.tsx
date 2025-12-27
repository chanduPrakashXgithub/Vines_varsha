'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Heart, MapPin, MessageCircle, Camera, Plane, Gem, Calendar } from 'lucide-react'
import Image from 'next/image'

interface TimelineEvent {
    id: string
    date: string
    title: string
    description: string
    image?: string
    icon: 'heart' | 'message' | 'camera' | 'plane' | 'ring' | 'calendar' | 'pin'
    poetry?: string
}

interface LoveTimelineProps {
    events?: TimelineEvent[]
}

const defaultEvents: TimelineEvent[] = [
    {
        id: '1',
        date: 'The Day We Met',
        title: 'When Stars Aligned',
        description: 'In a world of billions, somehow we found each other. The universe conspired to bring our souls together.',
        icon: 'heart',
        poetry: 'Two hearts, one destiny...',
    },
    {
        id: '2',
        date: 'First Message',
        title: 'Hello Changed Everything',
        description: 'A simple hello that sparked an eternal conversation. Words became the bridge between two hearts.',
        icon: 'message',
        poetry: 'From strangers to soulmates...',
    },
    {
        id: '3',
        date: 'First Date',
        title: 'Butterflies & Magic',
        description: 'Time stopped when our eyes met. In that moment, I knew you were my forever.',
        icon: 'pin',
        poetry: 'Where every moment felt like a lifetime...',
    },
    {
        id: '4',
        date: 'First Trip Together',
        title: 'Adventures Begin',
        description: 'We discovered that home isn\'t a place—it\'s wherever we\'re together.',
        icon: 'plane',
        poetry: 'The world became our playground...',
    },
    {
        id: '5',
        date: 'The Proposal',
        title: 'Forever Starts Now',
        description: 'One question, one answer, one love that will last for all eternity.',
        icon: 'ring',
        poetry: 'Yes to infinity and beyond...',
    },
    {
        id: '6',
        date: 'Wedding Day',
        title: 'Two Become One',
        description: 'The beginning of our greatest adventure—a lifetime of love.',
        icon: 'calendar',
        poetry: 'Today, tomorrow, always...',
    },
]

const iconComponents = {
    heart: Heart,
    message: MessageCircle,
    camera: Camera,
    plane: Plane,
    ring: Gem,
    calendar: Calendar,
    pin: MapPin,
}

export function LoveTimeline({ events = defaultEvents }: LoveTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

    return (
        <section
            ref={containerRef}
            className="relative py-20 md:py-32 overflow-hidden"
            id="timeline"
        >
            {/* Section Header */}
            <motion.div
                className="text-center mb-16 md:mb-24 px-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1 }}
            >
                <motion.span
                    className="text-champagne-600 uppercase tracking-[0.3em] text-sm font-sans mb-4 block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Chapter by Chapter
                </motion.span>
                <h2 className="heading-romantic text-5xl md:text-7xl mb-6">
                    Our Journey
                </h2>
                <p className="text-poetic max-w-xl mx-auto">
                    Every moment with you is a page in our beautiful love story
                </p>
                <div className="divider-romantic mt-8" />
            </motion.div>

            {/* Timeline Container */}
            <div className="relative max-w-6xl mx-auto px-6">
                {/* Animated Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-blush-100">
                    <motion.div
                        className="w-full bg-gradient-to-b from-blush-400 via-romance-400 to-champagne-500"
                        style={{ height: lineHeight }}
                    />
                </div>

                {/* Timeline Events */}
                <div className="relative space-y-16 md:space-y-24">
                    {events.map((event, index) => (
                        <TimelineItem
                            key={event.id}
                            event={event}
                            index={index}
                            isEven={index % 2 === 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

interface TimelineItemProps {
    event: TimelineEvent
    index: number
    isEven: boolean
}

function TimelineItem({ event, index, isEven }: TimelineItemProps) {
    const itemRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(itemRef, { once: true, margin: '-100px' })

    const Icon = iconComponents[event.icon]

    return (
        <motion.div
            ref={itemRef}
            className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {/* Content Card */}
            <motion.div
                className={`w-full md:w-5/12 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} text-center md:text-inherit`}
                initial={{
                    opacity: 0,
                    x: isEven ? -50 : 50,
                    filter: 'blur(10px)'
                }}
                animate={isInView ? {
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)'
                } : {}}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <div className="glass-romantic p-6 md:p-8 group hover:shadow-glow-pink transition-all duration-500">
                    {/* Date Badge */}
                    <span className="inline-block px-4 py-1 rounded-full bg-champagne-100/50 text-champagne-700 text-sm font-sans mb-4">
                        {event.date}
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-2xl md:text-3xl text-midnight-800 mb-3">
                        {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-midnight-600 leading-relaxed mb-4">
                        {event.description}
                    </p>

                    {/* Poetry Line */}
                    {event.poetry && (
                        <motion.p
                            className="text-poetic text-romance-500 text-sm"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8 }}
                        >
                            {event.poetry}
                        </motion.p>
                    )}

                    {/* Image Preview */}
                    {event.image && (
                        <motion.div
                            className="mt-6 relative aspect-video rounded-xl overflow-hidden photo-frame"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Timeline Dot */}
            <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 z-10 my-6 md:my-0"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                    type: 'spring',
                    stiffness: 200,
                    delay: 0.5
                }}
            >
                <div className="relative">
                    {/* Outer Glow */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-romance-400 opacity-30 blur-md"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Icon Container */}
                    <div className="relative w-14 h-14 rounded-full bg-white shadow-romantic flex items-center justify-center border-4 border-blush-100">
                        <Icon className="w-6 h-6 text-romance-500" />
                    </div>
                </div>
            </motion.div>

            {/* Spacer for opposite side */}
            <div className="hidden md:block w-5/12" />
        </motion.div>
    )
}
