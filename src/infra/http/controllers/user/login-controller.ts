import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { loginService } from '../../factories/user/make-login.js'
import { LoginBody } from '../../types/user-types.js'
import { env } from '../../../config/env'

class LoginController {
  async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body as LoginBody
      const data = await loginService.execute({ email, password })
      const token = jwt.sign({ sub: data }, env.JWT_SECRET, {
        expiresIn: '1d',
      })
      return res.status(200).json({ access_token: token })
    } catch (error) {
      next(error)
    }
  }
}

export const loginController = new LoginController().handler.bind(
  new LoginController(),
)
