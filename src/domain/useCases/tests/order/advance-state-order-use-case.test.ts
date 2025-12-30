import { Order } from 'src/domain/entities/order-entity'
import { Service } from 'src/domain/entities/service-entity'
import { OrderRepository } from 'src/domain/repositories/order-repository'
import { OrderRepositoryInMemory } from 'test/repositories/order-repository-in-memory'
import { beforeAll, describe, expect, test } from 'vitest'
import { AdvanceStateOrderUseCase } from '../../order/advance-state-order-use-case'
import { afterEach, beforeEach } from 'node:test'

describe('Avance Status Order Use Case', () => {
  let repo: OrderRepository
  let service: Service
  let order: Order
  let sut: AdvanceStateOrderUseCase

  beforeAll(() => {
    repo = new OrderRepositoryInMemory()
    sut = new AdvanceStateOrderUseCase(repo)
    service = new Service('service-name', 5, 'PENDING')
    order = new Order(
      'lab-name',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [service],
    )

    repo.create(order)
  })

  test('should be able advance state to ANALYSIS', async () => {
    expect(
      await sut.execute({
        id: order.id,
        state: 'ANALYSIS',
      }),
    ).toMatchObject(
      expect.objectContaining({
        id: order.id,
        state: 'ANALYSIS',
      }),
    )
  })

  test('should be not able advance state to CREATED after update state to ANALYSIS', async () => {
    console.log(repo.listOrders())
    await expect(
      sut.execute({
        id: order.id,
        state: 'CREATED',
      }),
    ).rejects.toThrowError('Value Invalid')
  })

  test('Should be able advance state to COMPLETED', async () => {
    expect(
      await sut.execute({
        id: order.id,
        state: 'COMPLETED',
      }),
    ).toMatchObject(
      expect.objectContaining({
        id: order.id,
        state: 'COMPLETED',
      }),
    )
  })
  test('Should be not able advance state to ANALYSIS or CREATED after update state to COMPLETED', async () => {
    await expect(
      sut.execute({
        id: order.id,
        state: 'ANALYSIS',
      }),
    ).rejects.toThrowError('Value Invalid')
    await expect(
      sut.execute({
        id: order.id,
        state: 'CREATED',
      }),
    ).rejects.toThrowError('Value Invalid')
  })

  test('Order not found', async () => {
    await expect(
      sut.execute({ id: 'e', state: 'ANALYSIS' }),
    ).rejects.toThrowError('Resource not found')
  })
})
