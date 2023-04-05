export interface User {
  name: string | null
  email: string | null
  image: string | null
}

export interface UserRepo {
  getUserById(id: string): Promise<User | null>
}
