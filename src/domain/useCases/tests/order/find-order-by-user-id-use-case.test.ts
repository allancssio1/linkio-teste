import { beforeAll, describe, expect, test } from 'vitest'
import { Order } from '../../../entities/order-entity'
import { Service } from '../../../entities/service-entity'
import { User } from '../../../entities/user-entity'
import { OrderRepository } from '../../../repositories/order-repository'
import { OrderRepositoryInMemory } from '../../../../../tests/repositories/order-repository-in-memory'
import { FindOrderByUserIdUseCase } from '../../order/find-order-by-user-id-use-case'

describe('Unit Test Find Order', () => {
  let repo: OrderRepository
  let order: Order
  let sut: FindOrderByUserIdUseCase
  let user: User

  beforeAll(() => {
    repo = new OrderRepositoryInMemory()
    user = new User('john.doe@example.com', '123456')
    sut = new FindOrderByUserIdUseCase(repo)
    for (let i = 0; i < 3; i++) {
      order = new Order(
        `lab-name ${i}`,
        'patient-name',
        'customer-name',
        'CREATED',
        'ACTIVE',
        [new Service('name service 1', 10, 'PENDING')],
        user.id,
      )

      repo.create(order)
    }
  })
  test('Should be able list orders by user id', async () => {
    expect(await sut.execute({ userId: user.id })).toMatchObject([
      expect.objectContaining({
        userId: user.id,
        lab: 'lab-name 0',
      }),
      expect.objectContaining({
        userId: user.id,
        lab: 'lab-name 1',
      }),
      expect.objectContaining({
        userId: user.id,
        lab: 'lab-name 2',
      }),
    ])
  })
  test('Should be able list orders by user id and state', async () => {
    repo.advanceStatus('ANALYSIS', order.id)

    expect(
      await sut.execute({ userId: user.id, state: 'ANALYSIS' }),
    ).toMatchObject([
      expect.objectContaining({
        userId: user.id,
        state: 'ANALYSIS',
      }),
    ])
    repo.advanceStatus('COMPLETED', order.id)
    expect(
      await sut.execute({ userId: user.id, state: 'COMPLETED' }),
    ).toMatchObject([
      expect.objectContaining({
        userId: user.id,
        state: 'COMPLETED',
      }),
    ])
  })
})
