import { zodResolver } from '@hookform/resolvers/zod'
import {
  ActionIcon,
  Button,
  Fieldset,
  Flex,
  Group,
  Stack,
  TextInput,
} from '@mantine/core'
import axios from 'axios'
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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const userFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  cep: z.string().min(8, 'CEP inválido').max(8, 'CEP inválido'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'UF é obrigatório').max(2, 'UF inválido'),
  complement: z.string(),
})

interface ServiceCepResponse {
  cep: string
  city: string
  state: string
  neighborhood: string
  street: string
}

export type UserFormData = z.infer<typeof userFormSchema>

const initialValues: UserFormData = {
  name: '',
  email: '',
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: '',
  complement: '',
}

export function UserForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<UserFormData>({
    defaultValues: initialValues,
    resolver: zodResolver(userFormSchema),
  })

  const [searchingCep, setSearchingCep] = useState(false)

  const cep = watch('cep')

  async function handleSearchCep() {
    if (cep.length !== 8) {
      return
    }

    try {
      setSearchingCep(true)

      const { data } = await axios.get<ServiceCepResponse>(
        `https://brasilapi.com.br/api/cep/v1/${cep}`,
      )

      setValue('city', data.city)
      setValue('state', data.state)
      setValue('neighborhood', data.neighborhood)
      setValue('street', data.street)
    } catch (error) {
      alert('CEP não encontrado')
    } finally {
      setSearchingCep(false)
    }
  }

  async function handleSave(data: UserFormData) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    // TODO: salvar usuário no NOTION
    console.log(data)

    reset(initialValues)
  }

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Fieldset legend="Informações do usuário" disabled={searchingCep}>
        <Stack gap="sm">
          <TextInput
            label="Nome"
            leftSection={<UserRound size={20} />}
            {...register('name')}
            error={errors.name?.message}
          />

          <TextInput
            label="E-mail"
            leftSection={<Mail size={20} />}
            {...register('email')}
            error={errors.email?.message}
          />

          <Flex gap="xs" align="flex-end">
            <TextInput
              label="CEP"
              type="number"
              leftSection={<MapPin size={20} />}
              flex={1}
              {...register('cep')}
              error={errors.cep?.message}
            />

            <ActionIcon
              type="button"
              h={36}
              w={36}
              variant="default"
              aria-label="Buscar CEP"
              onClick={handleSearchCep}
            >
              <Search size={18} />
            </ActionIcon>
          </Flex>

          <Flex gap="sm">
            <TextInput
              label="Rua"
              flex={1}
              leftSection={<Map size={20} />}
              {...register('street')}
              error={errors.street?.message}
            />

            <TextInput
              label="Número"
              type="number"
              leftSection={<Locate size={20} />}
              {...register('number')}
              error={errors.number?.message}
            />
          </Flex>

          <Flex gap="sm">
            <TextInput
              label="Bairro"
              flex={1}
              leftSection={<Map size={20} />}
              {...register('neighborhood')}
              error={errors.neighborhood?.message}
            />

            <TextInput
              label="Cidade"
              flex={1}
              leftSection={<MapPinned size={20} />}
              {...register('city')}
              error={errors.city?.message}
            />

            <TextInput
              label="UF"
              leftSection={<MapPinned size={20} />}
              {...register('state')}
              error={errors.state?.message}
            />
          </Flex>

          <TextInput
            label="Complemento"
            leftSection={<Map size={20} />}
            {...register('complement')}
            error={errors.complement?.message}
          />

          <Group justify="flex-end">
            <Button
              type="submit"
              loading={isSubmitting}
              leftSection={<Save size={20} />}
            >
              Salvar Dados
            </Button>
          </Group>
        </Stack>
      </Fieldset>
    </form>
  )
}