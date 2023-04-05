import { UserRepo } from '@/src/core/entities/user'
import {
  testUser,
  TestUserRepo,
} from '@/src/core/infra/repositories/TestUserRepo'
import { UserUseCases } from '@/src/core/use-cases/UserUseCases'

describe('UserUseCases', () => {
  let testUserRepo: UserRepo

  beforeEach(() => {
    testUserRepo = new TestUserRepo()
  })

  it('should construct a UserUseCases object', () => {
    const userUseCases = new UserUseCases(testUserRepo)
    expect(userUseCases).toBeInstanceOf(UserUseCases)
  })

  it('should return a user if found', async () => {
    const userUseCases = new UserUseCases(testUserRepo)
    const user = await userUseCases.getUserById('123')
    expect(user).toEqual(testUser)
  })

  it('should return null if user not found', async () => {
    const userUseCases = new UserUseCases(testUserRepo)
    const user = await userUseCases.getUserById('456')
    expect(user).toBeNull()
  })
})
