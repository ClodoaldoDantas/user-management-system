import { api } from '../lib/api'

interface CreateUserRequest {
  number: string
  name: string
  email: string
  whatsapp: string
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  complement: string
}

export async function createUser(data: CreateUserRequest) {
  await api.post('/users', data)
}
