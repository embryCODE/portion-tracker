import { Day, DayRepo } from '@/src/core/entities/day'
import { Result } from '@/src/core/shared/result'
import prisma from '@/src/infra/prisma'

export class PrismaDayRepo implements DayRepo {
  async getDayByDate(userId: string, date: Date) {
    const nextDate = new Date(new Date(date).setDate(date.getDate() + 1))

    try {
      const day = await prisma.day.findFirst({
        where: {
          AND: [
            { authorId: userId },
            {
              date: {
                gte: date,
                lt: nextDate,
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

      return Result.ok(day)
    } catch (e) {
      if (e instanceof Error) {
        return Result.fail(e)
      } else {
        return Result.fail(new Error('Unknown error'))
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

      return Result.ok(newDay)
    } catch (e) {
      if (e instanceof Error) {
        return Result.fail(e)
      } else {
        return Result.fail(new Error('Unknown error'))
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

      return Result.ok()
    } catch (e) {
      if (e instanceof Error) {
        return Result.fail(e)
      } else {
        return Result.fail(new Error('Unknown error'))
      }
    }
  }
}
