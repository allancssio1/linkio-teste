import { env } from '../config/env'
import { app } from './app'
import { connectToDatabase } from '../database/mongoose/connection'

async function bootstrap() {
  await connectToDatabase()

  app.listen(env.PORT, '0.0.0.0', () => {
    console.log('HTTP Server Running!')
  })
}

bootstrap()
