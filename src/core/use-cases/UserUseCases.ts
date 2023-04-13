import { User, UserRepo, validateUserName } from '@/src/core/entities/user'

export class UserUseCases {
  userRepo: UserRepo

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo
    this.getUserById = userRepo.getUserById
  }

  public updateUser(userId: string, user: User) {
    const validatedUserName = validateUserName(user.name)

    if (validatedUserName.isFailure) {
      return validatedUserName
    }

    return this.userRepo.updateUser(userId, user)
  }

  public getUserById
}
