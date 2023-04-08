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

  describe('getUserById', () => {
    it('should construct a UserUseCases object', () => {
      const userUseCases = new UserUseCases(testUserRepo)
      expect(userUseCases).toBeInstanceOf(UserUseCases)
    })

    it('should return a user if found', async () => {
      const userUseCases = new UserUseCases(testUserRepo)
      const user = await userUseCases.getUserById('123')
      expect(user).toEqual({ ok: true, value: testUser })
    })

    it('should return null if user not found', async () => {
      const userUseCases = new UserUseCases(testUserRepo)
      const user = await userUseCases.getUserById('456')
      expect(user).toStrictEqual({ ok: true, value: null })
    })
  })

  describe('updateUserName', () => {
    it('should update the user name and return the updated user', async () => {
      const userUseCases = new UserUseCases(testUserRepo)
      const user = await userUseCases.updateUserName('123', 'Mr. Furious')
      expect(user).toEqual({
        ok: true,
        value: { ...testUser, name: 'Mr. Furious' },
      })
    })

    it('should return null if user not found', async () => {
      const userUseCases = new UserUseCases(testUserRepo)
      const user = await userUseCases.updateUserName('456', 'Mr. Furious')
      expect(user).toStrictEqual({ ok: true, value: null })
    })
  })
})
