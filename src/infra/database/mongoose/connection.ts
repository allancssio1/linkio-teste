import mongoose from 'mongoose'
import { env } from 'src/infra/config/env'

export async function connectToDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect()
  console.log('✅ Disconnected from MongoDB')
}

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error)
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
})
