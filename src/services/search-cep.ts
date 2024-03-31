import axios from 'axios'

interface ServiceCepResponse {
  cep: string
  city: string
  state: string
  neighborhood: string
  street: string
}

export async function searchCep(cep: string) {
  const response = await axios.get<ServiceCepResponse>(
    `https://brasilapi.com.br/api/cep/v1/${cep}`,
  )

  return response.data
}
