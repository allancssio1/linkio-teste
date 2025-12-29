import { ValueInvalidError } from 'src/core/errors/errors/value-invalid'

export class Service {
  name: string
  value: number
  status: 'PENDING' | 'DONE'
  constructor(name: string, value: number, status: 'PENDING' | 'DONE') {
    this.name = name

    this.value = this.validValue(value)
    this.status = status ?? 'PENDING'
  }

  private validValue(value: number) {
    if (value <= 0) {
      throw new ValueInvalidError()
    }
    return value
  }
}
