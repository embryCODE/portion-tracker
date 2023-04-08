import { PlanRepo } from '@/src/core/entities/plan'
import {
  testPlan,
  TestPlanRepo,
} from '@/src/core/infra/repositories/TestPlanRepo'
import { PlanUseCases } from '@/src/core/use-cases/PlanUseCases'

describe('PlanUseCases', () => {
  let testPlanRepo: PlanRepo

  beforeEach(() => {
    testPlanRepo = new TestPlanRepo()
  })

  describe('createOrUpdatePlan', () => {
    it('should construct a PlanUseCases object', () => {
      const planUseCases = new PlanUseCases(testPlanRepo)
      expect(planUseCases).toBeInstanceOf(PlanUseCases)
    })

    it('should create a plan if not found', async () => {
      const planUseCases = new PlanUseCases(testPlanRepo)
      const plan = await planUseCases.createOrUpdatePlan('1', testPlan)

      expect(plan).toStrictEqual({ ok: true, value: testPlan })
    })

    it('should update a plan if found', async () => {
      const planUseCases = new PlanUseCases(testPlanRepo)

      // Create a plan
      await planUseCases.createOrUpdatePlan('1', testPlan)

      // Update the plan
      const updatedPlan = await planUseCases.createOrUpdatePlan('1', {
        ...testPlan,
        name: 'New name',
      })

      expect(updatedPlan).toStrictEqual({
        ok: true,
        value: { ...testPlan, name: 'New name' },
      })
    })
  })
})
