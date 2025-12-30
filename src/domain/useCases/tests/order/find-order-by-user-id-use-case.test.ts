import { Order } from 'src/domain/entities/order-entity'
import { OrderRepository } from 'src/domain/repositories/order-repository'
import { beforeAll, describe, expect, test } from 'vitest'
import { OrderRepositoryInMemory } from 'test/repositories/order-repository-in-memory'
import { Service } from 'src/domain/entities/service-entity'
import { User } from 'src/domain/entities/user-entity'
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
  test('Find success', async () => {
    expect(await sut.execute({ userId: user.id })).toMatchObject([
      expect.objectContaining({
        userId: user.id,
      }),
      expect.objectContaining({
        userId: user.id,
      }),
      expect.objectContaining({
        userId: user.id,
      }),
    ])
  })
})
