import { beforeAll, describe, expect, test } from 'vitest'

describe.skip('Avance Status Order Use Case', () => {
  let repo: OrderRepository
  let order: Order
  let sut: UpdateOrderUseCase

  beforeAll(() => {
    repo = new OrderRepositoryInMemory()
    sut = new UpdateOrderUseCase(repo)
    order = new Order('allan')

    repo.create(order)
  })
  test('Update success', async () => {
    expect(
      await sut.execute({
        id: order.id,
        name: 'cassio',
      }),
    ).toMatchObject(
      expect.objectContaining({
        id: order.id,
        name: 'cassio',
      }),
    )
  })

  test('Order not found', async () => {
    await expect(
      sut.execute({ id: 'e', name: order.name }),
    ).rejects.toThrowError('Order not found')
  })
})
