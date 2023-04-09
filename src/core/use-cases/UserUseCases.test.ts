import { Container, makeTestContainer } from '@/src/container'
import { testUser } from '@/src/infra/repositories/TestUserRepo'

describe('UserUseCases', () => {
  let testContainer: Container

  beforeEach(() => {
    testContainer = makeTestContainer()
  })

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      const user = await testContainer.getUserById('123')
      expect(user).toEqual({ ok: true, value: testUser })
    })

    it('should return null if user not found', async () => {
      const user = await testContainer.getUserById('456')
      expect(user).toStrictEqual({ ok: true, value: null })
    })
  })

  describe('updateUserName', () => {
    it('should return an error if name is not a string', async () => {
      const user = await testContainer.updateUserName(
        '123',
        null as unknown as string
      )

      expect(user).toEqual({
        ok: false,
        error: new Error('Name must be a string'),
      })
    })

    it('should return an error if name is too short', async () => {
      const user = await testContainer.updateUserName('123', '')

      expect(user).toEqual({
        ok: false,
        error: new Error('Name must be at least 1 character'),
      })
    })

    it('should return an error if name is too long', async () => {
      const user = await testContainer.updateUserName(
        '123',
        '123456789012345678901234567890123456789012345678901' // 51 characters
      )

      expect(user).toEqual({
        ok: false,
        error: new Error('Name must be at most 50 characters'),
      })
    })

    it('should update the user name and return the updated user', async () => {
      const user = await testContainer.updateUserName('123', 'Mr. Furious')
      expect(user).toEqual({
        ok: true,
        value: { ...testUser, name: 'Mr. Furious' },
      })
    })

    it('should return null if user not found', async () => {
      const user = await testContainer.updateUserName('456', 'Mr. Furious')
      expect(user).toStrictEqual({ ok: true, value: null })
    })
  })
})
