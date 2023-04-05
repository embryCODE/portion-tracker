import { PrismaClient } from '@prisma/client'

import { UserRepo } from '@/src/core/entities/user'

const prisma = new PrismaClient()

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
}
