import { UseCaseError } from '../error-usecase'

export abstract class AppError extends Error implements UseCaseError {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name

    Error.captureStackTrace(this, this.constructor)
  }
}
