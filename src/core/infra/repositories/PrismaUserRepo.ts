import { UserRepo } from '@/src/core/entities/user'
import prisma from '@/src/core/infra/prisma'

export class PrismaUserRepo implements UserRepo {
  async getUserById(id: string) {
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
  }
  async updateUserName(id: string, name: string) {
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
  }
}
