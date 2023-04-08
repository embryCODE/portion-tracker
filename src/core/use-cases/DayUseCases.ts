import { DayRepo } from '@/src/core/entities/day'

export class DayUseCases {
  constructor(dayRepo: DayRepo) {
    this.getDayByDate = dayRepo.getDayByDate
    this.createOrUpdateDay = dayRepo.createOrUpdateDay
    this.deleteDay = dayRepo.deleteDay
  }

  public getDayByDate
  public createOrUpdateDay
  public deleteDay
}
