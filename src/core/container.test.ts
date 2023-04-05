import { UserRepo } from '@/src/core/entities/user'

import { Container } from './container'

describe('Container', () => {
  let testUserRepo: UserRepo

  beforeEach(() => {
    testUserRepo = {
      getUserById: jest.fn(),
    }
  })

  it('should construct a container object', () => {
    const container = new Container({ userRepo: testUserRepo })
    expect(container).toBeInstanceOf(Container)
  })

  it('should have a getUserById method', () => {
    const container = new Container({ userRepo: testUserRepo })
    expect(container.getUserById).toBe(testUserRepo.getUserById)
  })
})
