import { DayRepo } from '@/src/core/entities/day'
import { PlanRepo } from '@/src/core/entities/plan'
import { UserRepo } from '@/src/core/entities/user'
import { PrismaDayRepo } from '@/src/core/infra/repositories/PrismaDayRepo'
import { PrismaPlanRepo } from '@/src/core/infra/repositories/PrismaPlanRepo'
import { PrismaUserRepo } from '@/src/core/infra/repositories/PrismaUserRepo'
import { DayUseCases } from '@/src/core/use-cases/DayUseCases'
import { PlanUseCases } from '@/src/core/use-cases/PlanUseCases'
import { UserUseCases } from '@/src/core/use-cases/UserUseCases'

// This is the composition root for the whole app
interface ContainerDeps {
  userRepo: UserRepo
  planRepo: PlanRepo
  dayRepo: DayRepo
}

export class Container {
  constructor({ userRepo, planRepo, dayRepo }: ContainerDeps) {
    const userUseCases = new UserUseCases(userRepo)
    const planUseCases = new PlanUseCases(planRepo)
    const dayUseCases = new DayUseCases(dayRepo)

    this.getUserById = userUseCases.getUserById
    this.updateUserName = userUseCases.updateUserName

    this.getAllPlansByUserId = planUseCases.getAllPlansByUserId
    this.getPlanById = planUseCases.getPlanById
    this.createOrUpdatePlan = planUseCases.createOrUpdatePlan
    this.deletePlan = planUseCases.deletePlan

    this.getDayByDate = dayUseCases.getDayByDate
    this.createOrUpdateDay = dayUseCases.createOrUpdateDay
    this.deleteDay = dayUseCases.deleteDay
  }

  // These public methods are all the use cases for the app
  public getUserById
  public updateUserName

  public getAllPlansByUserId
  public getPlanById
  public createOrUpdatePlan
  public deletePlan

  public getDayByDate
  public createOrUpdateDay
  public deleteDay
}

export const container = new Container({
  userRepo: new PrismaUserRepo(),
  planRepo: new PrismaPlanRepo(),
  dayRepo: new PrismaDayRepo(),
})
