import {
  ActionIcon,
  Button,
  Fieldset,
  Flex,
  Group,
  Stack,
  TextInput,
} from '@mantine/core'
import {
  Locate,
  Mail,
  Map,
  MapPin,
  MapPinned,
  Save,
  Search,
  UserRound,
} from 'lucide-react'

export function UserForm() {
  return (
    <form>
      <Fieldset legend="Informações do usuário">
        <Stack gap="sm">
          <TextInput label="Nome" leftSection={<UserRound size={20} />} />
          <TextInput label="E-mail" leftSection={<Mail size={20} />} />

          <Flex gap="xs" align="flex-end">
            <TextInput
              label="CEP"
              type="number"
              leftSection={<MapPin size={20} />}
              flex={1}
            />

            <ActionIcon h={36} w={36} variant="default" aria-label="Buscar CEP">
              <Search size={18} />
            </ActionIcon>
          </Flex>

          <Flex gap="sm">
            <TextInput label="Rua" flex={1} leftSection={<Map size={20} />} />
            <TextInput
              label="Número"
              type="number"
              leftSection={<Locate size={20} />}
            />
          </Flex>

          <Flex gap="sm">
            <TextInput
              label="Bairro"
              flex={1}
              leftSection={<Map size={20} />}
            />

            <TextInput
              label="Cidade"
              flex={1}
              leftSection={<MapPinned size={20} />}
            />

            <TextInput label="UF" leftSection={<MapPinned size={20} />} />
          </Flex>

          <TextInput label="Complemento" leftSection={<Map size={20} />} />

          <Group justify="flex-end">
            <Button type="submit" leftSection={<Save size={20} />}>
              Salvar Dados
            </Button>
          </Group>
        </Stack>
      </Fieldset>
    </form>
  )
}
