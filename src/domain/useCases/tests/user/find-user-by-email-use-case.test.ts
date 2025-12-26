import { beforeAll, describe, expect, test } from 'vitest'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { UserRepositoryInMemory } from 'tests/repositories/user-repository-in-memory'
import { User } from 'src/domain/entities/user-entity'
import { FindUserByEmailUseCase } from 'src/domain/useCases/user/find-user-by-email-use-case'

describe('Unit Test Find User', () => {
  let repo: UserRepository
  let user: User
  let sut: FindUserByEmailUseCase

  beforeAll(() => {
    repo = new UserRepositoryInMemory()
    sut = new FindUserByEmailUseCase(repo)
    user = new User('john.doe@example.com', '123456')

    repo.create(user)
  })
  test('Find success', async () => {
    expect(
      await sut.execute({
        email: user.email,
      }),
    ).toMatchObject(
      expect.objectContaining({
        email: user.email,
      }),
    )
  })

  test('User not found', async () => {
    await expect(
      sut.execute({ email: 'jane.doe@example.com' }),
    ).rejects.toThrowError('Resource not found')
  })
})
