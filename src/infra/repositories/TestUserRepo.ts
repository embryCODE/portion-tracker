import { User, UserRepo } from '@/src/core/entities/user'
import { Result } from '@/src/core/shared/result'

export const testUser: User = {
  name: 'Testy McTesterson',
  email: 'testymctesterson@example.com',
  image: null,
  defaultPlanId: null,
}

export class TestUserRepo implements UserRepo {
  testUser: User = testUser

  public getUserById = (id: string) => {
    if (id === '123') {
      return Promise.resolve(Result.ok(this.testUser))
    } else {
      return Promise.resolve(Result.ok(null))
    }
  }

  public updateUser = (id: string, user: User) => {
    if (id === '123') {
      this.testUser = user

      return Promise.resolve(Result.ok(this.testUser))
    } else {
      return Promise.resolve(Result.ok(null))
    }
  }
}
