import { PlanRepo } from '@/src/core/entities/plan'
import prisma from '@/src/core/infra/prisma'

import { Plan } from '.prisma/client'

export class PrismaPlanRepo implements PlanRepo {
  async getAllPlansByUserId(userId: string) {
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
    })

    return { ok: true as const, value: plans }
  }
  async getPlanById(id: string) {
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
  }
  async createOrUpdatePlan(userId: string, plan: Plan) {
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
  }
}
