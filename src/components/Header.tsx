import { Tabs } from '@mantine/core'
import { UserRoundPlus, UserRoundSearch } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const menu = {
  'create-users': '/',
  'list-users': '/users',
}

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const activeTab = Object.keys(menu).find(
    key => menu[key as keyof typeof menu] === pathname,
  )

  function handleNavigate(value: string | null) {
    if (value === null) return

    const route = menu[value as keyof typeof menu]
    navigate(route)
  }

  return (
    <Tabs value={activeTab} onChange={value => handleNavigate(value)} mb="xl">
      <Tabs.List>
        <Tabs.Tab
          leftSection={<UserRoundPlus size={20} />}
          value="create-users"
        >
          Criar novo usuário
        </Tabs.Tab>

        <Tabs.Tab
          leftSection={<UserRoundSearch size={20} />}
          value="list-users"
        >
          Lista de usuários
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}
