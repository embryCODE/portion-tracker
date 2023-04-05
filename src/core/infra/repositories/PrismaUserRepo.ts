import { UserRepo } from '@/src/core/entities/user'
import { prisma } from '@/src/core/infra/prisma'

export class PrismaUserRepo implements UserRepo {
  getUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        image: true,
      },
    })
  }
  updateUserName(id: string, name: string) {
    return prisma.user.update({
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
  }
}
