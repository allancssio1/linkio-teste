import { test, expect, describe, beforeAll, beforeEach } from 'vitest'
import { Order } from '../order-entity'
import { Service } from '../service-entity'
import { User } from '../user-entity'

describe('Order Entity', () => {
  let user: User
  beforeAll(() => {
    user = new User('john.de@example.com', '123456')
  })

  test('Should be able create a Order Entity with success', () => {
    const service = new Service('service-name', 5, 'PENDING')
    const order = new Order(
      'lab-name',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [service],
      user.id,
    )
    expect(order).toMatchObject(
      expect.objectContaining({
        lab: 'lab-name',
        patient: 'patient-name',
        customer: 'customer-name',
        status: 'ACTIVE',
        state: 'CREATED',
        services: [
          {
            name: 'service-name',
            value: 5,
            status: 'PENDING',
          },
        ],
        userId: user.id,
      }),
    )
  })
  test('should handle a large number of services', () => {
    const services: Service[] = []
    for (let i = 0; i < 10; i++) {
      services.push(
        new Service(`service-${i}`, i + 1, i % 2 === 0 ? 'PENDING' : 'DONE'),
      )
    }

    const order = new Order(
      'lab-name',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      services,
      user.id,
    )
    expect(order.services.length).toBe(10)
    expect(order).toMatchObject(
      expect.objectContaining({
        lab: 'lab-name',
        patient: 'patient-name',
        customer: 'customer-name',
        status: 'ACTIVE',
        state: 'CREATED',
        services: services,
        userId: user.id,
      }),
    )
  })
  test('Should be not able alter state value to junp a state (CREATED -> COMPLETED), but should be able alter state value to CREATED -> ANALYSIS.', () => {
    const service = new Service('service-name', 5, 'PENDING')
    const order = new Order(
      'lab-name',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [service],
      user.id,
    )
    expect(() => (order.state = 'COMPLETED')).toThrowError('Value Invalid')
    order.state = 'ANALYSIS'
    expect(order.state).toBe('ANALYSIS')
  })

  test('Should be not able alter state value to back a state before (ANALYSIS -> CREATED), but should be able alter state value to ANALYSIS -> COMPLETED.', () => {
    const service = new Service('service-name', 5, 'PENDING')
    const order = new Order(
      'lab-name',
      'patient-name',
      'customer-name',
      'ANALYSIS',
      'ACTIVE',
      [service],
      user.id,
    )
    expect(() => (order.state = 'CREATED')).toThrowError('Value Invalid')
    order.state = 'COMPLETED'
    expect(order.state).toBe('COMPLETED')
  })
})
