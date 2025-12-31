import { test, expect, describe, beforeAll } from 'vitest'
import { Order } from '../../../entities/order-entity'
import { Service } from '../../../entities/service-entity'
import { User } from '../../../entities/user-entity'
import { OrderRepository } from '../../../repositories/order-repository'
import { OrderRepositoryInMemory } from '../../../../../tests/repositories/order-repository-in-memory'
import { CreateOrderUseCase } from '../../order/create-order-use-case'

describe('Create Order Use Case', () => {
  let sut: CreateOrderUseCase
  let repo: OrderRepository
  let user: User

  beforeAll(async () => {
    repo = new OrderRepositoryInMemory()
    sut = new CreateOrderUseCase(repo)
    user = new User('john.doe@example.com', '123456')
  })
  test('Create Order Success', async () => {
    const order = await sut.execute({
      lab: 'lab-name',
      patient: 'patient-name',
      customer: 'customer-name',
      services: [
        {
          name: 'name service 1',
          value: 10,
          status: 'PENDING',
        },
        {
          name: 'name service 2',
          value: 5,
          status: 'PENDING',
        },
      ],
      userId: user.id,
    })

    expect(order).toMatchObject(
      expect.objectContaining({
        lab: 'lab-name',
        patient: 'patient-name',
        customer: 'customer-name',
        state: 'CREATED',
        status: 'ACTIVE',
        services: [
          new Service('name service 1', 10, 'PENDING'),
          new Service('name service 2', 5, 'PENDING'),
        ],
        id: order.id,
      }),
    )
  })

  test('Service With Invalid Value', async () => {
    await expect(
      sut.execute({
        lab: 'lab-name',
        patient: 'patient-name',
        customer: 'customer-name',
        services: [
          {
            name: 'name service 1',
            value: 10,
            status: 'PENDING',
          },
          {
            name: 'name service 2',
            value: 0,
            status: 'PENDING',
          },
        ],
        userId: user.id,
      }),
    ).rejects.toThrowError('Value Invalid')
  })
})
