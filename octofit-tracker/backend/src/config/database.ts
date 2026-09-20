import mongoose from 'mongoose'

const connectionString = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

export async function connectDatabase() {
  try {
    await mongoose.connect(connectionString)
    console.log('Connected to octofit_db')
  } catch (error) {
    console.error('Unable to connect to octofit_db:', error)
  }
}

export default mongoose.connection
