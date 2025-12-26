import { randomUUID } from 'node:crypto'
import { Service } from './service-entity'

export class Order {
  id: string
  lab: string
  patient: string
  customer: string
  state: 'CREATED' | 'ANALYSIS' | 'COMPLETED'
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
    this.state = state
    this.status = status
    this.services = services
  }
}
