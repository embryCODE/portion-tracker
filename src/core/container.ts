import { PrismaUserRepo } from '@/src/core/infra/repositories/PrismaUserRepo'
import { UserUseCases } from '@/src/core/use-cases/UserUseCases'

// This is the composition root for the whole app
export class Container {
  constructor() {
    const prismaUserRepo = new PrismaUserRepo()
    const userUseCases = new UserUseCases(prismaUserRepo)

    this.getUserById = userUseCases.getUserById
  }

  // These public methods are all the use cases for the app
  public getUserById
}

export const container = new Container()
