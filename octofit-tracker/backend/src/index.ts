import express from 'express'
import { connectDatabase } from './config/database'
import apiRouter from './routes/api'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl })
})

app.get('/api/config', (_request, response) => {
  response.json({ apiUrl })
})

app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(`OctoFit API listening on ${apiUrl}`)
  void connectDatabase()
})