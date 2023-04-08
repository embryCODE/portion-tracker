import { PlanRepo } from '@/src/core/entities/plan'

export class PlanUseCases {
  constructor(planRepo: PlanRepo) {
    this.getAllPlansByUserId = planRepo.getAllPlansByUserId
    this.getPlanById = planRepo.getPlanById
    this.createOrUpdatePlan = planRepo.createOrUpdatePlan
    this.deletePlan = planRepo.deletePlan
  }

  public getAllPlansByUserId
  public getPlanById
  public createOrUpdatePlan
  public deletePlan
}
