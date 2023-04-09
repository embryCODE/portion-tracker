import { Container, makeTestContainer } from '@/src/container'
import { createEmptyDay } from '@/src/core/entities/day'
import { testDay } from '@/src/infra/repositories/TestDayRepo'
import { testPlan } from '@/src/infra/repositories/TestPlanRepo'

// noinspection JSUnusedGlobalSymbols
jest.mock('uuid', () => ({ v4: () => '123456789' }))

describe('DayUseCases', () => {
  let testContainer: Container

  beforeEach(() => {
    testContainer = makeTestContainer()
  })

  describe('getDayByDate', () => {
    it('should not create a day if there are no plans', async () => {
      const date = new Date()
      const day = await testContainer.getDayByDate('1', date.toISOString())

      expect(day).toStrictEqual({
        ok: false,
        error: new Error('Cannot create a new day without at least one plan'),
      })
    })

    it('should create a day if the day does not exist and there are plans', async () => {
      const date = new Date('2020-01-01')
      testContainer.createOrUpdatePlan('123', testPlan)
      const day = await testContainer.getDayByDate('123', date.toISOString())

      expect(day).toStrictEqual({
        ok: true,
        value: createEmptyDay(date, testPlan),
      })
    })
  })

  describe('createOrUpdateDay', () => {
    it('should create a day if not found', async () => {
      const day = await testContainer.createOrUpdateDay('1', testDay)

      expect(day).toStrictEqual({ ok: true, value: testDay })
    })

    it('should update a day if found', async () => {
      // Create a day
      await testContainer.createOrUpdateDay('1', testDay)

      // Update the day
      const updatedDay = await testContainer.createOrUpdateDay('1', {
        ...testDay,
        notes: 'New notes',
      })

      expect(updatedDay).toStrictEqual({
        ok: true,
        value: { ...testDay, notes: 'New notes' },
      })
    })
  })
})
