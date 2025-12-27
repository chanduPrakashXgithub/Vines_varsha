import mongoose, { Schema, Document, Model } from 'mongoose'

// Timeline Event Schema
export interface ITimelineEvent extends Document {
    date: string
    title: string
    description: string
    image?: string
    icon: 'heart' | 'message' | 'camera' | 'plane' | 'ring' | 'calendar' | 'pin'
    poetry?: string
    order: number
    createdAt: Date
    updatedAt: Date
}

const TimelineEventSchema = new Schema<ITimelineEvent>(
    {
        date: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
        icon: {
            type: String,
            enum: ['heart', 'message', 'camera', 'plane', 'ring', 'calendar', 'pin'],
            default: 'heart',
        },
        poetry: { type: String },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
)

// Love Letter Schema
export interface ILoveLetter extends Document {
    title: string
    date: string
    preview: string
    content: string
    from: string
    isPrivate: boolean
    createdAt: Date
    updatedAt: Date
}

const LoveLetterSchema = new Schema<ILoveLetter>(
    {
        title: { type: String, required: true },
        date: { type: String, required: true },
        preview: { type: String, required: true },
        content: { type: String, required: true },
        from: { type: String, required: true },
        isPrivate: { type: Boolean, default: false },
    },
    { timestamps: true }
)

// Memory (Photo/Video) Schema
export interface IMemory extends Document {
    type: 'image' | 'video'
    url: string
    publicId: string
    thumbnail?: string
    caption?: string
    date?: string
    poetry?: string
    tags: string[]
    isFavorite: boolean
    createdAt: Date
    updatedAt: Date
}

const MemorySchema = new Schema<IMemory>(
    {
        type: { type: String, enum: ['image', 'video'], required: true },
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        thumbnail: { type: String },
        caption: { type: String },
        date: { type: String },
        poetry: { type: String },
        tags: [{ type: String }],
        isFavorite: { type: Boolean, default: false },
    },
    { timestamps: true }
)

// Private Message Schema
export interface IPrivateMessage extends Document {
    content: string
    date: string
    unlockDate?: Date
    type: 'message' | 'anniversary' | 'timecapsule'
    isUnlocked: boolean
    createdAt: Date
    updatedAt: Date
}

const PrivateMessageSchema = new Schema<IPrivateMessage>(
    {
        content: { type: String, required: true },
        date: { type: String, required: true },
        unlockDate: { type: Date },
        type: {
            type: String,
            enum: ['message', 'anniversary', 'timecapsule'],
            default: 'message',
        },
        isUnlocked: { type: Boolean, default: true },
    },
    { timestamps: true }
)

// Site Settings Schema
export interface ISiteSettings extends Document {
    coupleName: string
    tagline: string
    weddingDate: Date
    venue: string
    privatePassword: string
    backgroundMusicUrl?: string
    theme: {
        primaryColor: string
        accentColor: string
    }
    socialLinks: {
        instagram?: string
        tiktok?: string
    }
    createdAt: Date
    updatedAt: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
    {
        coupleName: { type: String, required: true, default: 'Our Love Story' },
        tagline: {
            type: String,
            default: 'Every love story is beautiful, but ours is my favorite.',
        },
        weddingDate: { type: Date, required: true },
        venue: { type: String, default: 'Where Dreams Come True' },
        privatePassword: { type: String, required: true, default: 'ourlove' },
        backgroundMusicUrl: { type: String },
        theme: {
            primaryColor: { type: String, default: '#FF6B8A' },
            accentColor: { type: String, default: '#D4AF37' },
        },
        socialLinks: {
            instagram: { type: String },
            tiktok: { type: String },
        },
    },
    { timestamps: true }
)

// Easter Egg / Secret Schema
export interface IEasterEgg extends Document {
    trigger: 'scroll' | 'click' | 'time' | 'konami'
    message: string
    position?: {
        section: string
        x?: number
        y?: number
    }
    isActive: boolean
    createdAt: Date
}

const EasterEggSchema = new Schema<IEasterEgg>(
    {
        trigger: {
            type: String,
            enum: ['scroll', 'click', 'time', 'konami'],
            required: true,
        },
        message: { type: String, required: true },
        position: {
            section: { type: String },
            x: { type: Number },
            y: { type: Number },
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
)

// Video Memory Schema
export interface IVideoMemory extends Document {
    title: string
    url: string
    thumbnail?: string
    duration?: string
    description?: string
    date?: string
    tags: string[]
    isFavorite: boolean
    createdAt: Date
    updatedAt: Date
}

const VideoMemorySchema = new Schema<IVideoMemory>(
    {
        title: { type: String, required: true },
        url: { type: String, required: true },
        thumbnail: { type: String },
        duration: { type: String },
        description: { type: String },
        date: { type: String },
        tags: [{ type: String }],
        isFavorite: { type: Boolean, default: false },
    },
    { timestamps: true }
)

// Export models (with Next.js hot-reload protection)
export const TimelineEvent: Model<ITimelineEvent> =
    mongoose.models.TimelineEvent ||
    mongoose.model<ITimelineEvent>('TimelineEvent', TimelineEventSchema)

export const LoveLetter: Model<ILoveLetter> =
    mongoose.models.LoveLetter ||
    mongoose.model<ILoveLetter>('LoveLetter', LoveLetterSchema)

export const Memory: Model<IMemory> =
    mongoose.models.Memory || mongoose.model<IMemory>('Memory', MemorySchema)

export const PrivateMessage: Model<IPrivateMessage> =
    mongoose.models.PrivateMessage ||
    mongoose.model<IPrivateMessage>('PrivateMessage', PrivateMessageSchema)

export const SiteSettings: Model<ISiteSettings> =
    mongoose.models.SiteSettings ||
    mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)

export const EasterEgg: Model<IEasterEgg> =
    mongoose.models.EasterEgg ||
    mongoose.model<IEasterEgg>('EasterEgg', EasterEggSchema)

export const VideoMemory: Model<IVideoMemory> =
    mongoose.models.VideoMemory ||
    mongoose.model<IVideoMemory>('VideoMemory', VideoMemorySchema)
