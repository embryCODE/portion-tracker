import { UserRepo } from '@/src/core/entities/user'
import prisma from '@/src/core/infra/prisma'

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
  async updateUserName(id: string, name: string) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
        },
        select: {
          name: true,
          email: true,
          image: true,
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
}
