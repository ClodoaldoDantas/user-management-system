import { ActionIcon, Flex, Pagination, Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { Search, Trash } from 'lucide-react'

import { getUsers } from '../../services/get-users'

export function Users() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

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
          {users?.map(user => (
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
                  aria-label="Remover usuário"
                >
                  <Trash size={18} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Flex justify="flex-end">
        <Pagination mt="xl" total={5} />
      </Flex>
    </>
  )
}
