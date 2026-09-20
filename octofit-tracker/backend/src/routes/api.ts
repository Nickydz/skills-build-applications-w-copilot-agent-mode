import { Request, Response, Router } from 'express'
import { Model } from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models'

type ResourceModel = Model<Record<string, unknown>>

function resourceRouter(model: ResourceModel) {
  const router = Router()

  router.get('/', async (_request: Request, response: Response) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }).lean())
    } catch (error) {
      response.status(503).json({ error: 'Database unavailable' })
    }
  })

  router.get('/:id', async (request: Request, response: Response) => {
    try {
      const resource = await model.findById(request.params.id).lean()
      if (!resource) {
        response.status(404).json({ error: 'Resource not found' })
        return
      }
      response.json(resource)
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource id' })
    }
  })

  router.post('/', async (request: Request, response: Response) => {
    try {
      const resource = await model.create(request.body)
      response.status(201).json(resource)
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource data' })
    }
  })

  return router
}

const apiRouter = Router()
apiRouter.use('/users', resourceRouter(User as ResourceModel))
apiRouter.use('/teams', resourceRouter(Team as ResourceModel))
apiRouter.use('/activities', resourceRouter(Activity as ResourceModel))
apiRouter.use('/leaderboard', resourceRouter(Leaderboard as ResourceModel))
apiRouter.use('/workouts', resourceRouter(Workout as ResourceModel))

export default apiRouter
