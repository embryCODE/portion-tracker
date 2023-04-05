import { UserRepo } from '@/src/core/entities/user'

export class UserUseCases {
  constructor(userRepo: UserRepo) {
    this.getUserById = userRepo.getUserById
  }

  public getUserById
}
