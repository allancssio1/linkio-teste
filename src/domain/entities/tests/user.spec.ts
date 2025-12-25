import { test, expect, describe, beforeAll } from 'vitest'
import { User } from '../user-entity'

describe('User Entity', () => {
  test('Should be able create a User Entity with success', () => {
    const user = new User('john.doe@example.com', '123456')
    expect(user.email).toBe('john.doe@example.com')
    expect(user.password).toBe('123456')
  })
})
