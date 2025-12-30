import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserBody } from '../../types/user-types'
import { createUserService } from '../../factories/user/make-create-user'

class CreateUserController {
  async handle(
    request: FastifyRequest<{
      Body: CreateUserBody
    }>,
    reply: FastifyReply,
  ) {
    const { email, password } = request.body

    const user = await createUserService.execute({
      email,
      password,
    })

    return reply.status(200).send(user)
  }
}
export const createUserController = new CreateUserController().handle.bind(
  new CreateUserController(),
)
