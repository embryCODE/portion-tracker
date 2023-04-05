import { UserRepo } from '@/src/core/entities/user'
import { PrismaUserRepo } from '@/src/core/infra/repositories/PrismaUserRepo'
import { UserUseCases } from '@/src/core/use-cases/UserUseCases'

// This is the composition root for the whole app
interface ContainerDeps {
  userRepo: UserRepo
}

export class Container {
  constructor({ userRepo }: ContainerDeps) {
    const userUseCases = new UserUseCases(userRepo)

    this.getUserById = userUseCases.getUserById
  }

  // These public methods are all the use cases for the app
  public getUserById
}

export const container = new Container({ userRepo: new PrismaUserRepo() })
