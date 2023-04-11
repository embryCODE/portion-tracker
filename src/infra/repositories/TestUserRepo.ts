import { User, UserRepo } from '@/src/core/entities/user'

export let testUser: User = {
  name: 'Testy McTesterson',
  email: 'testymctesterson@example.com',
  image: null,
  defaultPlanId: null,
}

export class TestUserRepo implements UserRepo {
  public getUserById = (id: string) => {
    if (id === '123') {
      return Promise.resolve({ ok: true as const, value: testUser })
    } else {
      return Promise.resolve({ ok: true as const, value: null })
    }
  }

  public updateUser = (id: string, user: User) => {
    if (id === '123') {
      testUser = user

      return Promise.resolve({
        ok: true as const,
        value: testUser,
      })
    } else {
      return Promise.resolve({ ok: true as const, value: null })
    }
  }
}
