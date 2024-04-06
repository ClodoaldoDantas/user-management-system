import { Flex, Loader, Pagination, Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getUsers } from '../../services/get-users'
import { UserTableRow } from './components/user-table-row'

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
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.users.map(user => <UserTableRow key={user.id} user={user} />)}
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
