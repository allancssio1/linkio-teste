import { test, expect, describe, beforeAll } from 'vitest'
import { Order } from '../order-entity'

describe('Order Entity', () => {
  test('Should be able create a Order Entity with success', () => {
    const order = new Order(
      'lab-name',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [],
    )
    expect(order).toMatchObject(
      expect.objectContaining({
        lab: 'lab-name',
        patient: 'patient-name',
        customer: 'customer-name',
        status: 'ACTIVE',
        state: 'CREATED',
        services: [],
      }),
    )
  })
})
