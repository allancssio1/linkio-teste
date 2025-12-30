import { beforeAll, describe, expect, test } from 'vitest'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { UserRepositoryInMemory } from 'tests/repositories/user-repository-in-memory'
import { User } from 'src/domain/entities/user-entity'
import { FindUserByIdUseCase } from 'src/domain/useCases/user/find-user-by-id-use-case'

describe('Unit Test Find User', () => {
  let repo: UserRepository
  let user: User
  let sut: FindUserByIdUseCase

  beforeAll(() => {
    repo = new UserRepositoryInMemory()
    sut = new FindUserByIdUseCase(repo)
    user = new User('john.doe@example.com', '123456')

    repo.create(user)
  })
  test('Find success', async () => {
    expect(
      await sut.execute({
        id: user.id,
      }),
    ).toMatchObject(
      expect.objectContaining({
        id: user.id,
      }),
    )
  })

  test('User not found', async () => {
    await expect(sut.execute({ id: 'e' })).rejects.toThrowError(
      'Resource not found',
    )
  })
})
