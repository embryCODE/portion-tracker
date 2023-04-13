import { Container, makeTestContainer } from '@/src/container'
import { createEmptyPlan } from '@/src/core/entities/plan'
import { testPlan } from '@/src/infra/repositories/TestPlanRepo'
import { testUser } from '@/src/infra/repositories/TestUserRepo'

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

  describe('deletePlan', () => {
    it('should delete a plan if found', async () => {
      await testContainer.createOrUpdatePlan('123', testPlan)
      const plans = await testContainer.getAllPlansByUserId('123')

      expect(plans.getValue()[0]).toStrictEqual(testPlan)

      await testContainer.deletePlan('123', testPlan.id)

      expect(plans.getValue()[0]).toBeUndefined()
    })

    it('should set the most recent plan to the new default if the old default plan is deleted', async () => {
      // Arrange
      const testPlan1 = {
        ...testPlan,
        id: '1',
      }
      const testPlan2 = {
        ...testPlan,
        id: '2',
      }
      const testPlan3 = {
        ...testPlan,
        id: '3',
      }
      testContainer.createOrUpdatePlan('123', testPlan1)
      testContainer.createOrUpdatePlan('123', testPlan2)
      testContainer.createOrUpdatePlan('123', testPlan3)

      // There are now three plans in the repo
      // The default plan is set to the first one
      await testContainer.updateUser('123', {
        ...testUser,
        defaultPlanId: testPlan1.id,
      })

      // Act
      // Delete the plan that is the user's default
      await testContainer.deletePlan('123', testPlan1.id)

      // Assert
      const userRes = await testContainer.getUserById('123')

      // The default plan should now be the most recent not-deleted plan
      expect(userRes.getValue()?.defaultPlanId).toBe(testPlan3.id)
    })

    it('should set the defaultPlanId to null if the default plan is deleted and there are no more plans', async () => {
      // Arrange
      const testPlan1 = {
        ...testPlan,
        id: '1',
      }
      testContainer.createOrUpdatePlan('123', testPlan1)

      await testContainer.updateUser('123', {
        ...testUser,
        defaultPlanId: testPlan1.id,
      })

      await testContainer.deletePlan('123', testPlan1.id)

      const userRes = await testContainer.getUserById('123')

      // The default plan should now be the most recent not-deleted plan
      expect(userRes.getValue()?.defaultPlanId).toBe(null)
    })
  })
})
