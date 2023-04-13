import { Result } from '@/src/core/shared/result'

export interface User {
  name: string | null
  email: string | null
  image: string | null
  defaultPlanId: string | null
}

export interface UserRepo {
  getUserById(id: string): Promise<Result<User | null>>
  updateUser(id: string, user: Partial<User>): Promise<Result<User | null>>
}

export function validateUserName(name: unknown) {
  if (typeof name !== 'string') {
    return Result.fail(new Error('Name must be a string'))
  }

  if (name.length < 1) {
    return Result.fail(new Error('Name must be at least 1 character'))
  }

  if (name.length > 50) {
    return Result.fail(new Error('Name must be at most 50 characters'))
  }

  return Result.ok(name)
}
