import { randomUUID } from 'node:crypto'
import { Service } from './service-entity'
import { ValueInvalidError } from 'src/core/errors/errors/value-invalid'

export class Order {
  id: string
  lab: string
  patient: string
  customer: string
  private _state: 'CREATED' | 'ANALYSIS' | 'COMPLETED'
  status: 'ACTIVE' | 'DELETED'
  services: Service[]

  constructor(
    lab: string,
    patient: string,
    customer: string,
    state: 'CREATED' | 'ANALYSIS' | 'COMPLETED',
    status: 'ACTIVE' | 'DELETED',
    services: Service[],
    id?: string,
  ) {
    this.id = id ?? randomUUID()
    this.lab = lab
    this.patient = patient
    this.customer = customer
    this._state = this.alterState(state)
    this.status = status
    this.services = services
  }

  private alterState(state: 'CREATED' | 'ANALYSIS' | 'COMPLETED') {
    if (!this._state) {
      return state
    }

    if (this._state === state) {
      return state
    }

    if (this._state === 'CREATED' && state === 'COMPLETED') {
      throw new ValueInvalidError()
    }

    if (this._state === 'ANALYSIS' && state === 'CREATED') {
      throw new ValueInvalidError()
    }

    if (this._state === 'COMPLETED' && state !== 'COMPLETED') {
      throw new ValueInvalidError()
    }

    return state
  }

  get state(): 'CREATED' | 'ANALYSIS' | 'COMPLETED' {
    return this._state
  }

  set state(newState: 'CREATED' | 'ANALYSIS' | 'COMPLETED') {
    this._state = this.alterState(newState)
  }
}
