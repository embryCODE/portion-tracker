import { PlanRepo } from '@/src/core/entities/plan'
import prisma from '@/src/core/infra/prisma'

import { Plan } from '.prisma/client'

export class PrismaPlanRepo implements PlanRepo {
  getAllPlansByUserId(id: string) {
    return prisma.plan.findMany({
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
  }
  getPlanById(id: string) {
    return prisma.plan.findUnique({
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
  }
  createOrUpdatePlan(userId: string, plan: Plan) {
    return prisma.plan.upsert({
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
  }
}
