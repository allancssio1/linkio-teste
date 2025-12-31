import { Request, Response, NextFunction } from 'express'
import { CreateUserBody } from '../../types/user-types'
import { createUserService } from '../../factories/user/make-create-user'

class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as CreateUserBody

      const user = await createUserService.execute({
        email,
        password,
      })

      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}
export const createUserController = new CreateUserController().handle.bind(
  new CreateUserController(),
)
