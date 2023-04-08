import { Day, DayRepo } from '@/src/core/entities/day'
import prisma from '@/src/core/infra/prisma'

export class PrismaDayRepo implements DayRepo {
  async getDayByDate(userId: string, date: Date) {
    const startOfDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    const endOfDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    )

    try {
      const day = await prisma.day.findFirst({
        where: {
          AND: [
            { authorId: userId },
            {
              date: {
                gte: startOfDate,
                lt: endOfDate,
              },
            },
          ],
        },
        select: {
          id: true,
          notes: true,
          date: true,
          protein: true,
          vegetables: true,
          carbs: true,
          fat: true,
          plan: {
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
          },
        },
      })

      return { ok: true as const, value: day }
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false as const, error: e }
      } else {
        return { ok: false as const, error: new Error('Unknown error') }
      }
    }
  }
  async createOrUpdateDay(userId: string, day: Day) {
    try {
      const newDay = await prisma.day.upsert({
        where: {
          id: day.id,
        },
        create: {
          id: day.id,
          notes: day.notes,
          date: day.date,
          protein: day.protein,
          vegetables: day.vegetables,
          carbs: day.carbs,
          fat: day.fat,
          authorId: userId,
          planId: day.plan.id,
        },
        update: {
          id: day.id,
          notes: day.notes,
          date: day.date,
          protein: day.protein,
          vegetables: day.vegetables,
          carbs: day.carbs,
          fat: day.fat,
          authorId: userId,
          planId: day.plan.id,
        },
        select: {
          id: true,
          notes: true,
          date: true,
          protein: true,
          vegetables: true,
          carbs: true,
          fat: true,
          plan: {
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
          },
        },
      })

      return { ok: true as const, value: newDay }
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false as const, error: e }
      } else {
        return { ok: false as const, error: new Error('Unknown error') }
      }
    }
  }

  async deleteDay(id: string) {
    try {
      await prisma.day.delete({
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
