import { UseCaseError } from '../error-usecase'

export class ValueInvalidError extends Error implements UseCaseError {
  constructor() {
    super('Value Service Invalid')
  }
}
