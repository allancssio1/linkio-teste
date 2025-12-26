import { UseCaseError } from '../error-usecase'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('User already exists')
  }
}
