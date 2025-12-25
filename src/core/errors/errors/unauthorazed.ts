import { UseCaseError } from '../error-usecase'

export class UnauthorazedError extends Error implements UseCaseError {
  constructor() {
    super('Unauthorazed')
  }
}
