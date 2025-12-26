export class Service {
  name: string
  value: number
  status: 'PENDING' | 'DONE'
  constructor(name: string, value: number, status: 'PENDING' | 'DONE') {
    this.name = name
    this.value = value
    this.status = status ?? 'PENDING'
  }
}
