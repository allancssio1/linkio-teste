import { Order } from 'src/domain/entities/order-entity'
import { Service } from 'src/domain/entities/service-entity'
import { OrderRepository } from 'src/domain/repositories/order-repository'
import { OrderRepositoryInMemory } from 'test/repositories/order-repository-in-memory'
import { beforeAll, describe, expect, test } from 'vitest'
import { AdvanceStateOrderUseCase } from '../../order/advance-state-order-use-case'
import { User } from 'src/domain/entities/user-entity'

describe('Avance Status Order Use Case', () => {
  let repo: OrderRepository
  let service: Service
  let order: Order
  let sut: AdvanceStateOrderUseCase
  let user: User

  beforeAll(() => {
    repo = new OrderRepositoryInMemory()
    user = new User('john.doe@example.com', '123456')
    sut = new AdvanceStateOrderUseCase(repo)
    service = new Service('service-name', 5, 'PENDING')
    order = new Order(
      'lab-name',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [service],
      user.id,
    )

    repo.create(order)
  })

  test('should be able advance state to ANALYSIS', async () => {
    expect(
      await sut.execute({
        id: order.id,
      }),
    ).toMatchObject(
      expect.objectContaining({
        id: order.id,
        state: 'ANALYSIS',
      }),
    )
  })

  test('Should be able advance state to COMPLETED', async () => {
    expect(
      await sut.execute({
        id: order.id,
      }),
    ).toMatchObject(
      expect.objectContaining({
        id: order.id,
        state: 'COMPLETED',
      }),
    )
  })

  test('Order not found', async () => {
    await expect(sut.execute({ id: 'e' })).rejects.toThrowError(
      'Resource not found',
    )
  })
})
