import { beforeAll, describe, expect, test } from 'vitest'
import { Order } from '../../../entities/order-entity'
import { Service } from '../../../entities/service-entity'
import { User } from '../../../entities/user-entity'
import { OrderRepository } from '../../../repositories/order-repository'
import { OrderRepositoryInMemory } from '../../../../../tests/repositories/order-repository-in-memory'
import { FindOrderByIdUseCase } from '../../order/find-order-by-id-use-case'

describe('Unit Test Find Order', () => {
  let repo: OrderRepository
  let order: Order
  let sut: FindOrderByIdUseCase
  let user: User

  beforeAll(() => {
    repo = new OrderRepositoryInMemory()
    user = new User('john.doe@example.com', '123456')
    sut = new FindOrderByIdUseCase(repo)
    order = new Order(
      'lab-name 1',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [new Service('name service 1', 10, 'PENDING')],
      user.id,
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
