import { Order } from 'src/domain/entities/order-entity'
import { OrderRepository } from 'src/domain/repositories/order-repository'
import { beforeAll, describe, expect, test } from 'vitest'
import { FindOrderByIdUseCase } from '../../order/find-order-by-id-use-case'
import { OrderRepositoryInMemory } from 'test/repositories/order-repository-in-memory'
import { Service } from 'src/domain/entities/service-entity'

describe('Unit Test Find Order', () => {
  let repo: OrderRepository
  let order: Order
  let sut: FindOrderByIdUseCase

  beforeAll(() => {
    repo = new OrderRepositoryInMemory()
    sut = new FindOrderByIdUseCase(repo)
    order = new Order(
      'lab-name 1',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [new Service('name service 1', 10, 'PENDING')],
    )

    repo.create(order)
  })
  test('Find success', async () => {
    expect(
      await sut.execute({
        id: order.id,
      }),
    ).toMatchObject(
      expect.objectContaining({
        id: order.id,
      }),
    )
  })

  test('Order not found', async () => {
    await expect(sut.execute({ id: 'e' })).rejects.toThrowError(
      'Resource not found',
    )
  })
})
