import { User, UserRepo, validateUserName } from '@/src/core/entities/user'
import { Result } from '@/src/core/shared/result'

export class UserUseCases {
  userRepo: UserRepo

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo
    this.getUserById = userRepo.getUserById
  }

  public updateUser(userId: string, user: User) {
    const validatedUserName = validateUserName(user.name)

    if (validatedUserName.isFailure) {
      return Result.fail(validatedUserName.getError())
    }

    return this.userRepo.updateUser(userId, user)
  }

  public getUserById
}
