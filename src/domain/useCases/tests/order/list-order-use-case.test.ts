import { Order } from 'src/domain/entities/order-entity'
import { OrderRepository } from 'src/domain/repositories/order-repository'
import { beforeAll, describe, expect, test } from 'vitest'
import { ListOrderUseCase } from '../../order/list-order-use-case'
import { OrderRepositoryInMemory } from 'test/repositories/order-repository-in-memory'
import { Service } from 'src/domain/entities/service-entity'
import { User } from 'src/domain/entities/user-entity'

describe('Unit Test Find Order', () => {
  let repo: OrderRepository
  let order1: Order
  let order2: Order
  let order3: Order
  let sut: ListOrderUseCase
  let user: User

  beforeAll(() => {
    repo = new OrderRepositoryInMemory()
    sut = new ListOrderUseCase(repo)
    user = new User('john.doe@example.com', '123456')
    order1 = new Order(
      'lab-name 1',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [new Service('name service 1', 10, 'PENDING')],
      user.id,
    )
    order2 = new Order(
      'lab-name 2',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [new Service('name service 2', 10, 'PENDING')],
      user.id,
    )
    order3 = new Order(
      'lab-name 3',
      'patient-name',
      'customer-name',
      'CREATED',
      'ACTIVE',
      [new Service('name service 3', 10, 'PENDING')],
      user.id,
    )

    repo.create(order1)
    repo.create(order2)
    repo.create(order3)
  })
  test('List Order Success', async () => {
    expect(await sut.execute()).toEqual(
      expect.arrayContaining([order1, order2, order3]),
    )
  })
})
