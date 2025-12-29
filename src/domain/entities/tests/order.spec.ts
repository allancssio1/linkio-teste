import { test, expect, describe, beforeAll, beforeEach } from 'vitest'
import { Order } from '../order-entity'
import { Service } from '../service-entity'

describe('Order Entity', () => {
  test('Should be able create a Order Entity with success', () => {
    const service = new Service('service-name', 5, 'PENDING')
    const order = new Order(
      'lab-name',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [service],
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
    )
    expect(() => (order.state = 'CREATED')).toThrowError('Value Invalid')
    order.state = 'COMPLETED'
    expect(order.state).toBe('COMPLETED')
  })
})
