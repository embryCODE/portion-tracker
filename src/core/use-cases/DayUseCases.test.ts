import { DayRepo } from '@/src/core/entities/day'
import { testDay, TestDayRepo } from '@/src/core/infra/repositories/TestDayRepo'
import { DayUseCases } from '@/src/core/use-cases/DayUseCases'

describe('DayUseCases', () => {
  let testDayRepo: DayRepo

  beforeEach(() => {
    testDayRepo = new TestDayRepo()
  })

  describe('createOrUpdateDay', () => {
    it('should construct a DayUseCases object', () => {
      const dayUseCases = new DayUseCases(testDayRepo)
      expect(dayUseCases).toBeInstanceOf(DayUseCases)
    })

    it('should create a day if not found', async () => {
      const dayUseCases = new DayUseCases(testDayRepo)
      const day = await dayUseCases.createOrUpdateDay('1', testDay)

      expect(day).toStrictEqual({ ok: true, value: testDay })
    })

    it('should update a day if found', async () => {
      const dayUseCases = new DayUseCases(testDayRepo)

      // Create a day
      await dayUseCases.createOrUpdateDay('1', testDay)

      // Update the day
      const updatedDay = await dayUseCases.createOrUpdateDay('1', {
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
