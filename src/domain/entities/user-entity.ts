import { randomUUID } from 'node:crypto'

export class User {
  email: string
  password: string
  id: string
  constructor(email: string, password: string, id?: string) {
    this.id = id ?? randomUUID()
    this.email = email
    this.password = password
  }
}
