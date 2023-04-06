import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'

import { PlanRepo } from '@/src/core/entities/plan'
import { PrismaPlanRepo } from '@/src/core/infra/repositories/PrismaPlanRepo'
import { PlanUseCases } from '@/src/core/use-cases/PlanUseCases'

import prisma from '../infra/prisma'
import { Plan as PrismaPlan } from '.prisma/client'

jest.mock('../infra/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

const testPlan = {
  id: '1',
  name: 'Plan 1',
  description: 'Plan 1 description',
  protein: 1,
  vegetables: 1,
  carbs: 1,
  fat: 1,
  meals: 1,
}

describe('PlanUseCases', () => {
  let prismaPlanRepo: PlanRepo

  beforeEach(() => {
    prismaPlanRepo = new PrismaPlanRepo()
    mockReset(prismaMock)
    prismaMock.plan.upsert.mockResolvedValue(testPlan as PrismaPlan)
  })

  describe('createOrUpdatePlan', () => {
    it('should construct a PlanUseCases object', () => {
      const planUseCases = new PlanUseCases(prismaPlanRepo)
      expect(planUseCases).toBeInstanceOf(PlanUseCases)
    })

    it('should create a plan', async () => {
      const planUseCases = new PlanUseCases(prismaPlanRepo)
      const plan = await planUseCases.createOrUpdatePlan('1', testPlan)

      expect(plan).toStrictEqual(testPlan)
    })
  })
})
