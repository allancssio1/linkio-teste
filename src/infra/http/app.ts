import fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fromZodError } from 'zod-validation-error'
import { ZodError } from '../config/zod-v4'
import { userRoutes } from './routes/user-routes'
import { AppError } from 'src/core/errors/errors/app-error'
import { env } from '../config/env'
import { authRoutes } from './routes/auth-routes'
import { orderRoutes } from './routes/order-routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'User Service',
      description: 'API for User Service',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.get('/', () => {
  return { status: 'ok' }
})

app.register(userRoutes, {
  prefix: '/users',
})

app.register(authRoutes, {
  prefix: '/auth',
})
app.register(orderRoutes, {
  prefix: '/orders',
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: 'Validation error.',
      errors: error,
    })
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      errors: fromZodError(error),
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

export { app }
