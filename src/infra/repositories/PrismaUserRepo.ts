import { User, UserRepo } from '@/src/core/entities/user'
import { Result } from '@/src/core/shared/result'
import prisma from '@/src/infra/prisma'

export class PrismaUserRepo implements UserRepo {
  async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          name: true,
          email: true,
          image: true,
          defaultPlanId: true,
        },
      })

      return Result.ok(user)
    } catch (e) {
      if (e instanceof Error) {
        return Result.fail(e)
      } else {
        return Result.fail(new Error('Unknown error'))
      }
    }
  }
  async updateUser(id: string, user: Partial<User>) {
    try {
      const newUser = await prisma.user.update({
        where: {
          id,
        },
        data: user,
        select: {
          name: true,
          email: true,
          image: true,
          defaultPlanId: true,
        },
      })

      return Result.ok(newUser)
    } catch (e) {
      if (e instanceof Error) {
        return Result.fail(e)
      } else {
        return Result.fail(new Error('Unknown error'))
      }
    }
  }
}
