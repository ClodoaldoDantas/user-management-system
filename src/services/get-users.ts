import { type User } from '../interfaces/user'
import { api } from '../lib/api'

export async function getUsers(): Promise<User[]> {
  const response = await api.get('/users', {
    params: {
      _page: 1,
      _limit: 10,
    },
  })

  return response.data
}
