import { Service } from './service-entity'

export class Order {
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
  ) {
    this.lab = lab
    this.patient = patient
    this.customer = customer
    this.state = state
    this.status = status
    this.services = services
  }
}
