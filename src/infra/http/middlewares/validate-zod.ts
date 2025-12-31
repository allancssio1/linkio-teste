import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

export type ValidationTarget = 'body' | 'query' | 'params'

export function validateZod(schema: ZodSchema, target: ValidationTarget = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[target]
      const validated = schema.parse(data)
      req[target] = validated
      next()
    } catch (error: any) {
      return res.status(400).json({
        message: 'Validation error.',
        errors: fromZodError(error),
      })
    }
  }
}
