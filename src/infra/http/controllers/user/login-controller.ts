import { FastifyReply, FastifyRequest } from 'fastify'
import { loginService } from '../../factories/user/make-login.js'
import { LoginBody } from '../../types/user-types.js'

class LoginController {
  async handler(
    request: FastifyRequest<{
      Body: LoginBody
    }>,
    reply: FastifyReply,
  ) {
    const { password, email } = request.body
    const data = await loginService.execute({ email, password })
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: data,
        },
      },
    )
    return reply.status(200).send({ access_token: token })
  }
}

export const loginController = new LoginController().handler.bind(
  new LoginController(),
)
