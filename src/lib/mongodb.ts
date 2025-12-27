import mongoose, { Connection } from 'mongoose'

interface MongooseCache {
    conn: Connection | null
    promise: Promise<Connection> | null
}

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined
}

const MONGODB_URI = (() => {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env')
    }
    return uri
})()

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null }

if (!global.mongooseCache) {
    global.mongooseCache = cached
}

async function dbConnect(): Promise<Connection> {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default dbConnect
