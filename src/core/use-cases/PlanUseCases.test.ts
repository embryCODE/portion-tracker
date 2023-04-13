import { Container, makeTestContainer } from '@/src/container'
import { createEmptyPlan } from '@/src/core/entities/plan'
import { testPlan } from '@/src/infra/repositories/TestPlanRepo'

// noinspection JSUnusedGlobalSymbols
jest.mock('uuid', () => ({ v4: () => '123456789' }))

describe('PlanUseCases', () => {
  let testContainer: Container

  beforeEach(() => {
    testContainer = makeTestContainer()
  })

  describe('createOrUpdatePlan', () => {
    it('should create a plan if not found', async () => {
      const plan = await testContainer.createOrUpdatePlan('1', testPlan)

      expect(plan.getValue()).toStrictEqual(testPlan)
    })

    it('should create an empty plan if a plan is not passed', async () => {
      const plan = await testContainer.createOrUpdatePlan('1')

      // uuid is mocked above
      expect(plan.getValue()).toStrictEqual(createEmptyPlan())
    })

    it('should update a plan if found', async () => {
      // Create a plan
      await testContainer.createOrUpdatePlan('1', testPlan)

      // Update the plan
      const updatedPlan = await testContainer.createOrUpdatePlan('1', {
        ...testPlan,
        name: 'New name',
      })

      expect(updatedPlan.getValue()).toStrictEqual({
        ...testPlan,
        name: 'New name',
      })
    })
  })
})
