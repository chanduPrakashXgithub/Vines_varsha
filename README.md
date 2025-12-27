# 💕 Our Love Story - A Digital Love Universe

> *"Every love story is beautiful, but ours is my favorite."*

A stunning, immersive, and emotionally powerful website designed for couples who want to preserve their love story digitally. This is not just a website—it's a love letter written in code.

![Love Story Banner](https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=400&fit=crop)

## ✨ Features

### 🕊️ **Cinematic Landing Experience**
- Full-screen emotional intro with soft animations
- Background music integration (optional)
- Poetic text reveals with blur effects
- Magical "Enter Our Story" CTA

### ❤️ **Love Timeline**
- Scroll-based interactive timeline
- Animated milestones with icons
- Photo integration at each event
- Poetry lines at each moment

### 💌 **Love Letters Vault**
- Digital handwritten-style letters
- Paper unfold animations
- Wax seal effects
- Private letter support

### 📸 **Memories Gallery**
- Masonry layout with hover effects
- Cinematic slideshow mode
- Cloudinary-powered media
- Poetic captions

### 🎥 **Video Memories Room**
- Immersive full-screen player
- Custom glass controls
- Memory-based playlists

### ⏳ **Wedding Countdown**
- Animated countdown timer
- Special messages as date approaches
- Wedding day celebration mode

### 🌙 **Private Space**
- Password protected area
- Time capsule messages
- Anniversary notes
- Future memory storage

### ✨ **Easter Eggs**
- Hidden clickable hearts
- Konami code activation
- Scroll-triggered messages
- Night mode with stars

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Cloudinary account
- npm or yarn

### Installation

1. **Clone or create the project:**
   ```bash
   cd Varsha-vines
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Configure your `.env` file:**
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/love-story

   # Cloudinary Configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # App Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Wedding Date (ISO format)
   NEXT_PUBLIC_WEDDING_DATE=2024-12-31T10:00:00

   # Private Space Password
   PRIVATE_SPACE_PASSWORD=your-secret-password

   # Background Music URL (optional - Cloudinary hosted)
   NEXT_PUBLIC_BG_MUSIC_URL=
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/               # Authentication
│   │   ├── letters/            # Love letters CRUD
│   │   ├── memories/           # Photos/videos CRUD
│   │   ├── settings/           # Site settings
│   │   └── timeline/           # Timeline events
│   ├── globals.css             # Global styles & Tailwind
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── components/
│   ├── effects/
│   │   ├── EasterEggs.tsx      # Secret interactions
│   │   └── ParticlesBackground.tsx
│   ├── providers/
│   │   └── AudioProvider.tsx   # Music context
│   ├── sections/
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx     # Landing experience
│   │   ├── LoveLettersVault.tsx
│   │   ├── LoveTimeline.tsx
│   │   ├── MemoriesGallery.tsx
│   │   ├── PrivateSpace.tsx
│   │   ├── VideoMemoriesRoom.tsx
│   │   └── WeddingCountdown.tsx
│   └── ui/
│       ├── LoadingScreen.tsx
│       ├── MusicControl.tsx
│       └── Navigation.tsx
└── lib/
    ├── cloudinary.ts           # Cloudinary utilities
    ├── models.ts               # MongoDB schemas
    └── mongodb.ts              # Database connection
```

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Ivory | `#FAF0E6` | Backgrounds |
| Blush | `#FF6B8A` | Primary accent |
| Champagne | `#D4AF37` | Gold accents |
| Romance | `#DC143C` | Deep red highlights |
| Midnight | `#102A43` | Dark text/backgrounds |

### Typography

- **Script**: Great Vibes (romantic headings)
- **Serif**: Cormorant Garamond (elegant body)
- **Sans**: Lato (UI elements)

### Animations

- Fade-in reveals
- Parallax scrolling
- Heartbeat effects
- Particle systems
- Glassmorphism transitions

## 📊 Database Schema

### Timeline Event
```typescript
{
  date: string,
  title: string,
  description: string,
  image?: string,
  icon: 'heart' | 'message' | 'camera' | 'plane' | 'ring' | 'calendar',
  poetry?: string,
  order: number
}
```

### Love Letter
```typescript
{
  title: string,
  date: string,
  preview: string,
  content: string,
  from: string,
  isPrivate: boolean
}
```

### Memory
```typescript
{
  type: 'image' | 'video',
  url: string,
  publicId: string,
  thumbnail?: string,
  caption?: string,
  date?: string,
  poetry?: string,
  isFavorite: boolean
}
```

## ☁️ Cloudinary Setup

1. Create a [Cloudinary account](https://cloudinary.com)
2. Get your credentials from the Dashboard
3. Create folders in Media Library:
   - `love-story/memories` - for photos and videos
   - `love-story/audio` - for background music

### Recommended Transformations

```javascript
// Optimized image delivery
`q_auto,f_auto,w_800,c_scale`

// Video thumbnail
`so_0,w_400,f_jpg`
```

## 🔐 Authentication

The private space uses a simple password authentication:

```typescript
// Default password: "ourlove"
// Change in .env: PRIVATE_SPACE_PASSWORD=your-secret
```

For production, consider:
- Adding rate limiting
- Using hashed passwords
- Implementing JWT tokens

## 📱 Mobile Experience

The site is fully responsive with:
- Mobile-first design
- Touch-optimized interactions
- Reduced animations for performance
- Collapsible navigation

## 🎵 Background Music

To add romantic background music:

1. Upload an MP3 to Cloudinary
2. Add the URL to `.env`:
   ```env
   NEXT_PUBLIC_BG_MUSIC_URL=https://res.cloudinary.com/your-cloud/video/upload/v123/audio/romantic.mp3
   ```

Or place an audio file at:
```
public/audio/romantic-bg.mp3
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_WEDDING_DATE=2024-12-31T10:00:00
PRIVATE_SPACE_PASSWORD=secure-password
```

## 💡 Customization Tips

### Changing the Couple Name
Edit `src/app/page.tsx`:
```typescript
<HeroSection
  coupleName="John & Jane"
  tagline="Your custom tagline"
/>
```

### Adding Timeline Events
Use the API or directly in MongoDB:
```javascript
POST /api/timeline
{
  "date": "June 15, 2020",
  "title": "We Met",
  "description": "The day everything changed...",
  "icon": "heart"
}
```

### Custom Easter Eggs
Edit `src/components/effects/EasterEggs.tsx`:
```typescript
const secretMessages = [
  { id: '1', message: 'Your custom secret message!' },
  // Add more...
]
```

## 🌟 Future Enhancements

- [ ] Voice note memories
- [ ] AI-generated love poetry
- [ ] QR code wedding invitations
- [ ] Guest book integration
- [ ] PWA offline support
- [ ] Multi-language support

## 📝 Poetry Lines Collection

Use these throughout the site:

```
"In your eyes, I found my home."
"Two hearts, one soul, infinite love."
"Every love story is beautiful, but ours is my favorite."
"You are my today and all of my tomorrows."
"I loved you yesterday, I love you still."
"Together is a wonderful place to be."
"You're the best thing I never planned."
"My heart recognized you before my eyes did."
```

## 🙏 Credits

- Fonts: Google Fonts
- Icons: Lucide React
- Animations: Framer Motion
- Styling: Tailwind CSS
- Images: Unsplash (demo only)

## 💕 Made with Love

This project was created with the belief that love deserves to be celebrated, preserved, and shared in the most beautiful way possible.

---

*"And they lived happily ever after..." - The Beginning*

---

## License

This is a private project created with love. Feel free to use it as inspiration for your own love story.
