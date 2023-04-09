import { UserRepo, validateUserName } from '@/src/core/entities/user'

export class UserUseCases {
  userRepo: UserRepo

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo
    this.getUserById = userRepo.getUserById
  }

  public updateUserName(userId: string, name: string) {
    const validatedUserName = validateUserName(name)

    if (!validatedUserName.ok) {
      return validatedUserName
    }

    return this.userRepo.updateUserName(userId, validatedUserName.value)
  }

  public getUserById
}
