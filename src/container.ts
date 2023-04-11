import { DayRepo } from '@/src/core/entities/day'
import { PlanRepo } from '@/src/core/entities/plan'
import { UserRepo } from '@/src/core/entities/user'
import { DayUseCases } from '@/src/core/use-cases/DayUseCases'
import { PlanUseCases } from '@/src/core/use-cases/PlanUseCases'
import { UserUseCases } from '@/src/core/use-cases/UserUseCases'
import { PrismaDayRepo } from '@/src/infra/repositories/PrismaDayRepo'
import { PrismaPlanRepo } from '@/src/infra/repositories/PrismaPlanRepo'
import { PrismaUserRepo } from '@/src/infra/repositories/PrismaUserRepo'
import { TestDayRepo } from '@/src/infra/repositories/TestDayRepo'
import { TestPlanRepo } from '@/src/infra/repositories/TestPlanRepo'
import { TestUserRepo } from '@/src/infra/repositories/TestUserRepo'

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
    const dayUseCases = new DayUseCases(dayRepo, planRepo)

    this.getUserById = userUseCases.getUserById.bind(userUseCases)
    this.updateUser = userUseCases.updateUser.bind(userUseCases)

    this.getAllPlansByUserId =
      planUseCases.getAllPlansByUserId.bind(planUseCases)
    this.getPlanById = planUseCases.getPlanById.bind(planUseCases)
    this.createOrUpdatePlan = planUseCases.createOrUpdatePlan.bind(planUseCases)
    this.deletePlan = planUseCases.deletePlan.bind(planUseCases)

    this.getDayByDate = dayUseCases.getDayByDate.bind(dayUseCases)
    this.createOrUpdateDay = dayUseCases.createOrUpdateDay.bind(dayUseCases)
    this.deleteDay = dayUseCases.deleteDay.bind(dayUseCases)
  }

  public getUserById
  public updateUser

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

export const makeTestContainer = () => {
  return new Container({
    userRepo: new TestUserRepo(),
    planRepo: new TestPlanRepo(),
    dayRepo: new TestDayRepo(),
  })
}
