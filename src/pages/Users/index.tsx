import { ActionIcon, Flex, Loader, Pagination, Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { Mail, PhoneCall, Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { getUsers } from '../../services/get-users'

const ITEMS_PER_PAGE = 10

export function Users() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const { data, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers({ page }),
  })

  function handlePaginate(page: number) {
    setSearchParams(params => {
      params.set('page', String(page))
      return params
    })
  }

  const totalPages = data?.total ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0

  if (isLoading) {
    return (
      <Flex justify="center" align="center" py="xl">
        <Loader />
      </Flex>
    )
  }

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>E-mail</Table.Th>
            <Table.Th>Ações</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.users.map(user => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.name}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>
                <ActionIcon
                  type="button"
                  h={32}
                  w={32}
                  variant="default"
                  aria-label="Abrir detalhes do usuário"
                >
                  <Search size={18} />
                </ActionIcon>

                <ActionIcon
                  type="button"
                  h={32}
                  w={32}
                  ml="xs"
                  variant="default"
                  aria-label="Enviar e-mail"
                >
                  <Mail size={18} />
                </ActionIcon>

                <ActionIcon
                  type="button"
                  h={32}
                  w={32}
                  ml="xs"
                  variant="default"
                  aria-label="Enviar mensagem no WhatsApp"
                >
                  <PhoneCall size={18} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <Flex justify="flex-end">
          <Pagination
            mt="xl"
            value={page}
            total={totalPages}
            onChange={handlePaginate}
          />
        </Flex>
      )}
    </>
  )
}
