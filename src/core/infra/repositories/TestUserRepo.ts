import { User, UserRepo } from '@/src/core/entities/user'

export const testUser: User = {
  name: 'Testy McTesterson',
  email: 'testymctesterson@example.com',
  image: null,
}

export class TestUserRepo implements UserRepo {
  public getUserById = (id: string) => {
    if (id === '123') {
      return Promise.resolve(testUser)
    } else {
      return Promise.resolve(null)
    }
  }

  public updateUserName = (id: string, name: string) => {
    if (id === '123') {
      return Promise.resolve({ ...testUser, name })
    } else {
      return Promise.resolve(null)
    }
  }
}
