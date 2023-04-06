import { PrismaPlanRepo } from '@/src/core/infra/repositories/PrismaPlanRepo'
import { TestUserRepo } from '@/src/core/infra/repositories/TestUserRepo'

import { Container } from './container'

describe('Container', () => {
  it('should construct a container object', () => {
    const container = new Container({
      userRepo: new TestUserRepo(),
      planRepo: new PrismaPlanRepo(),
    })
    expect(container).toBeInstanceOf(Container)
  })
})
