import { test, expect, describe, beforeAll } from 'vitest'
import { Order } from '../order-entity'
import { Service } from '../service-entity'

describe('Order Entity', () => {
  let order: Order
  let service: Service
  beforeAll(() => {
    service = new Service('service-name', 5, 'PENDING')
    order = new Order(
      'lab-name',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [service],
    )
  })

  test('Should be able create a Order Entity with success', () => {
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
        new Service(`service-${i}`, i, i % 2 === 0 ? 'PENDING' : 'DONE'),
      )
    }

    const orderWithManyServices = new Order(
      'lab-name',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      services,
    )
    expect(orderWithManyServices.services.length).toBe(10)
    expect(orderWithManyServices).toMatchObject(
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
})
