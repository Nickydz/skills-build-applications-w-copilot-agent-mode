import mongoose from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models'

const connectionString = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      { name: 'Avery Stone', username: 'averystone', email: 'avery@example.com' },
      { name: 'Jordan Lee', username: 'jordanlee', email: 'jordan@example.com' },
      { name: 'Morgan Patel', username: 'morganpatel', email: 'morgan@example.com' },
    ])

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'A team focused on steady progress and outdoor endurance.',
        memberIds: [users[0]._id.toString(), users[1]._id.toString()],
      },
      {
        name: 'Core Collective',
        description: 'Strength and mobility training for everyday athletes.',
        memberIds: [users[2]._id.toString()],
      },
    ])

    await User.updateOne(
      { _id: users[0]._id },
      { teamId: teams[0]._id.toString() },
    )
    await User.updateOne(
      { _id: users[1]._id },
      { teamId: teams[0]._id.toString() },
    )
    await User.updateOne(
      { _id: users[2]._id },
      { teamId: teams[1]._id.toString() },
    )

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'run',
        duration: 32,
        distance: 5.4,
        calories: 410,
        date: '2026-09-18',
      },
      {
        userId: users[1]._id.toString(),
        type: 'cycle',
        duration: 45,
        distance: 16.2,
        calories: 520,
        date: '2026-09-19',
      },
      {
        userId: users[2]._id.toString(),
        type: 'strength',
        duration: 28,
        calories: 260,
        date: '2026-09-19',
      },
    ])

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), username: users[0].username, points: 1240, rank: 1 },
      { userId: users[1]._id.toString(), username: users[1].username, points: 1085, rank: 2 },
      { userId: users[2]._id.toString(), username: users[2].username, points: 940, rank: 3 },
    ])

    await Workout.insertMany([
      {
        name: 'Trail Builder',
        type: 'cardio',
        difficulty: 'intermediate',
        duration: 35,
        description: 'Build sustainable pace with alternating running intervals.',
        exercises: ['5-minute warmup', '6 x 3-minute run', '5-minute cooldown'],
      },
      {
        name: 'Foundation Strength',
        type: 'strength',
        difficulty: 'beginner',
        duration: 25,
        description: 'A balanced full-body session for building basic strength.',
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Dead bugs', 'Glute bridges'],
      },
    ])

    console.log('Seeded users, teams, activities, leaderboard, and workouts')
    console.log('Database seeding complete')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase()
