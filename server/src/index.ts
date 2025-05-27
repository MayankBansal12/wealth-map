import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'

dotenv.config()

import authRoutes from './routes/auth.routes.js'
import memberRoutes from './routes/member.routes.js'
import profileRoutes from './routes/profile.routes.js'
import propertyRoutes from './routes/property.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/auth', authRoutes)
app.use('/api/members', memberRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/property', propertyRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  })
})

app.get('/', (req, res) => {
  res.send('Server is up!')
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'))
  })
}

app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack)
  const status = err.statusCode ?? 500
  const message = err.message ?? 'Something went wrong'
  res.status(status).json({ message })
})

const startServer = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI

    if (!MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined')
    }

    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    process.exit(1)
  }
}

startServer()
