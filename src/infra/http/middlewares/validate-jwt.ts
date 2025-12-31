import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env'
import { AuthenticatedRequest } from '../types/express'

export function verifyJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as any
    req.user = {
      sub: decoded.sub,
    }
    next()
  } catch (_error) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
}
