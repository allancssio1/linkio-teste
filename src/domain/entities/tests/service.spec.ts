import { test, expect, describe, beforeAll } from 'vitest'
import { Service } from '../service-entity'

describe('Service Entity', () => {
  test('Should be able create a Service Entity with success', () => {
    const service = new Service('service-name', 5, 'PENDING')
    expect(service).toMatchObject(
      expect.objectContaining({
        name: 'service-name',
        value: 5,
        status: 'PENDING',
      }),
    )
  })
})
