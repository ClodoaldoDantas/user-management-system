import { type User } from '../interfaces/user'
import { api } from '../lib/api'

export async function createUser(data: Omit<User, 'id'>) {
  await api.post('/users', data)
}
