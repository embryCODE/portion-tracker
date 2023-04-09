import { PlanRepo } from '@/src/core/entities/plan'
import prisma from '@/src/infra/prisma'

import { Plan } from '.prisma/client'

export class PrismaPlanRepo implements PlanRepo {
  async getAllPlansByUserId(userId: string) {
    try {
      const plans = await prisma.plan.findMany({
        where: {
          authorId: userId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          protein: true,
          vegetables: true,
          carbs: true,
          fat: true,
          meals: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return { ok: true as const, value: plans }
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false as const, error: e }
      } else {
        return { ok: false as const, error: new Error('Unknown error') }
      }
    }
  }
  async getPlanById(id: string) {
    try {
      const plan = await prisma.plan.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          protein: true,
          vegetables: true,
          carbs: true,
          fat: true,
          meals: true,
        },
      })

      return { ok: true as const, value: plan }
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false as const, error: e }
      } else {
        return { ok: false as const, error: new Error('Unknown error') }
      }
    }
  }
  async createOrUpdatePlan(userId: string, plan: Plan) {
    try {
      const newPlan = await prisma.plan.upsert({
        where: {
          id: plan.id,
        },
        create: {
          id: plan.id,
          name: plan.name,
          description: plan.description,
          protein: plan.protein,
          vegetables: plan.vegetables,
          carbs: plan.carbs,
          fat: plan.fat,
          meals: plan.meals,
          authorId: userId,
        },
        update: {
          id: plan.id,
          name: plan.name,
          description: plan.description,
          protein: plan.protein,
          vegetables: plan.vegetables,
          carbs: plan.carbs,
          fat: plan.fat,
          meals: plan.meals,
          authorId: userId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          protein: true,
          vegetables: true,
          carbs: true,
          fat: true,
          meals: true,
        },
      })

      return { ok: true as const, value: newPlan }
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false as const, error: e }
      } else {
        return { ok: false as const, error: new Error('Unknown error') }
      }
    }
  }

  async deletePlan(id: string) {
    try {
      await prisma.plan.delete({
        where: {
          id,
        },
      })

      return { ok: true as const, value: true as never }
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false as const, error: e }
      } else {
        return { ok: false as const, error: new Error('Unknown error') }
      }
    }
  }
}
