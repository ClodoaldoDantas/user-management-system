import { ActionIcon, Flex, Pagination, Table } from '@mantine/core'
import { Search, Trash } from 'lucide-react'

export function Users() {
  const users = [
    { id: 1, name: 'João', email: 'joao@example.com' },
    { id: 2, name: 'Maria', email: 'maria@example.com' },
    { id: 3, name: 'Pedro', email: 'pedro@example.com' },
    { id: 4, name: 'Ana', email: 'ana@example.com' },
    { id: 5, name: 'Lucas', email: 'lucas@example.com' },
  ]

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
          {users.map(user => (
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
