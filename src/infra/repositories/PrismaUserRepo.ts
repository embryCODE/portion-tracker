import { User, UserRepo } from '@/src/core/entities/user'
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

      return { ok: true as const, value: user }
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false as const, error: e }
      } else {
        return { ok: false as const, error: new Error('Unknown error') }
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

      return { ok: true as const, value: newUser }
    } catch (e) {
      if (e instanceof Error) {
        return { ok: false as const, error: e }
      } else {
        return { ok: false as const, error: new Error('Unknown error') }
      }
    }
  }
}
