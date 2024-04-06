import { type User } from '../interfaces/user'
import { api } from '../lib/api'

interface GetUserRequest {
  page: number
}

interface GetUsersResponse {
  users: User[]
  total: number
}

export async function getUsers({
  page,
}: GetUserRequest): Promise<GetUsersResponse> {
  const response = await api.get('/users', {
    params: {
      _page: page,
      _limit: 10,
    },
  })

  const total: number = response.headers['x-total-count']
  const users = response.data

  return {
    users,
    total,
  }
}
