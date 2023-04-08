import { PlanRepo } from '@/src/core/entities/plan'
import { UserRepo } from '@/src/core/entities/user'
import { PrismaPlanRepo } from '@/src/core/infra/repositories/PrismaPlanRepo'
import { PrismaUserRepo } from '@/src/core/infra/repositories/PrismaUserRepo'
import { PlanUseCases } from '@/src/core/use-cases/PlanUseCases'
import { UserUseCases } from '@/src/core/use-cases/UserUseCases'

// This is the composition root for the whole app
interface ContainerDeps {
  userRepo: UserRepo
  planRepo: PlanRepo
}

export class Container {
  constructor({ userRepo, planRepo }: ContainerDeps) {
    const userUseCases = new UserUseCases(userRepo)
    const planUseCases = new PlanUseCases(planRepo)

    this.getUserById = userUseCases.getUserById
    this.updateUserName = userUseCases.updateUserName
    this.getAllPlansByUserId = planUseCases.getAllPlansByUserId
    this.getPlanById = planUseCases.getPlanById
    this.createOrUpdatePlan = planUseCases.createOrUpdatePlan
    this.deletePlan = planUseCases.deletePlan
  }

  // These public methods are all the use cases for the app
  public getUserById
  public updateUserName
  public getAllPlansByUserId
  public getPlanById
  public createOrUpdatePlan
  public deletePlan
}

export const container = new Container({
  userRepo: new PrismaUserRepo(),
  planRepo: new PrismaPlanRepo(),
})
