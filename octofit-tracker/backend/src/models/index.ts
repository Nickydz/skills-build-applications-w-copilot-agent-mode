import mongoose, { Schema } from 'mongoose'

const resourceSchema = new Schema(
  {
    name: { type: String, trim: true },
    username: { type: String, trim: true },
    email: { type: String, trim: true },
    description: { type: String, trim: true },
    userId: { type: String, trim: true },
    teamId: { type: String, trim: true },
    type: { type: String, trim: true },
    duration: Number,
    points: Number,
    score: Number,
    rank: Number,
  },
  { timestamps: true, strict: false },
)

export const User = mongoose.models.User ?? mongoose.model('User', resourceSchema)
export const Team = mongoose.models.Team ?? mongoose.model('Team', resourceSchema)
export const Activity = mongoose.models.Activity ?? mongoose.model('Activity', resourceSchema)
export const Leaderboard = mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', resourceSchema)
export const Workout = mongoose.models.Workout ?? mongoose.model('Workout', resourceSchema)
