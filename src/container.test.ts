import { TestDayRepo } from '@/src/infra/repositories/TestDayRepo'
import { TestPlanRepo } from '@/src/infra/repositories/TestPlanRepo'
import { TestUserRepo } from '@/src/infra/repositories/TestUserRepo'

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
