import { TestDayRepo } from '@/src/core/infra/repositories/TestDayRepo'
import { TestPlanRepo } from '@/src/core/infra/repositories/TestPlanRepo'
import { TestUserRepo } from '@/src/core/infra/repositories/TestUserRepo'

import { Container } from './container'

describe('Container', () => {
  it('should construct a container object', () => {
    const container = new Container({
      userRepo: new TestUserRepo(),
      planRepo: new TestPlanRepo(),
      dayRepo: new TestDayRepo(),
    })
    expect(container).toBeInstanceOf(Container)
  })
})
