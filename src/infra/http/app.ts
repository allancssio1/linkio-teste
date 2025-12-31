import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { fromZodError } from 'zod-validation-error'
import { ZodError } from '../config/zod-v4'
import { userRoutes } from './routes/user-routes'
import { AppError } from 'src/core/errors/errors/app-error'
import { env } from '../config/env'
import { authRoutes } from './routes/auth-routes'
import { orderRoutes } from './routes/order-routes'

const app = express()

app.use(cors({
  origin: '*',
}))

app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  return res.json({ status: 'ok' })
})

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/orders', orderRoutes)

// Error handler - deve ser o último middleware
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  if (error.name === 'UserAlreadyExistsError') {
    return res.status(409).json({
      message: 'User already exists',
    })
  }

  if (error.name === 'UnauthorazedError') {
    return res.status(401).json({
      message: 'Invalid credentials',
    })
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: 'Validation error.',
      errors: error,
    })
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error.',
      errors: fromZodError(error),
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return res.status(500).json({ message: 'Internal server error.' })
})

export { app }
