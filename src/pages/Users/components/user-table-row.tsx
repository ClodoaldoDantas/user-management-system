import { ActionIcon, List, Modal, Table, ThemeIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Mail, MapPin, PhoneCall, Search, UserRound } from 'lucide-react'

import { type User } from '../../../interfaces/user'
import { clearMask } from '../../../utils/clear-maks'

export function UserTableRow({ user }: { user: User }) {
  const [opened, { open, close }] = useDisclosure(false)

  const phoneUnmask = clearMask(user.whatsapp)

  return (
    <>
      <Table.Tr>
        <Table.Td>{user.name}</Table.Td>
        <Table.Td>{user.email}</Table.Td>
        <Table.Td>
          <ActionIcon
            type="button"
            onClick={open}
            h={32}
            w={32}
            variant="default"
            aria-label="Abrir detalhes do usuário"
          >
            <Search size={18} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>

      <Modal
        size="lg"
        opened={opened}
        onClose={close}
        title="Detalhes do Usuário"
      >
        <List size="sm" spacing="xs">
          <List.Item
            icon={
              <ThemeIcon color="pink" size={32} radius="xl">
                <UserRound size={18} />
              </ThemeIcon>
            }
          >
            {user.name}
          </List.Item>

          <List.Item
            icon={
              <ThemeIcon color="pink" size={32} radius="xl">
                <Mail size={18} />
              </ThemeIcon>
            }
          >
            <a
              style={{ color: 'var(--mantine-color-text)' }}
              href={`mailto:${user.email}`}
            >
              {user.email}
            </a>
          </List.Item>

          <List.Item
            icon={
              <ThemeIcon color="pink" size={32} radius="xl">
                <PhoneCall size={18} />
              </ThemeIcon>
            }
          >
            <a
              style={{ color: 'var(--mantine-color-text)' }}
              href={`tel:+55${phoneUnmask}`}
            >
              {user.whatsapp}
            </a>
          </List.Item>

          <List.Item
            icon={
              <ThemeIcon color="pink" size={32} radius="xl">
                <MapPin size={18} />
              </ThemeIcon>
            }
          >
            {user.street}, {user.number} - {user.neighborhood}, {user.city} -{' '}
            {user.state}, {user.cep}
          </List.Item>
        </List>
      </Modal>
    </>
  )
}
