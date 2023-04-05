import { UserRepo } from '@/src/core/entities/user'
import { TestUserRepo } from '@/src/core/infra/repositories/TestUserRepo'

import { Container } from './container'

describe('Container', () => {
  let testUserRepo: UserRepo

  beforeEach(() => {
    testUserRepo = new TestUserRepo()
  })

  it('should construct a container object', () => {
    const container = new Container({ userRepo: testUserRepo })
    expect(container).toBeInstanceOf(Container)
  })
})
