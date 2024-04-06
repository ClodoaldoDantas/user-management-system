import { zodResolver } from '@hookform/resolvers/zod'
import {
  ActionIcon,
  Button,
  Fieldset,
  Flex,
  Group,
  InputBase,
  Stack,
  TextInput,
} from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import {
  Locate,
  Mail,
  Map,
  MapPin,
  MapPinned,
  Phone,
  Save,
  Search,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { toast } from 'sonner'
import { z } from 'zod'

import { createUser } from '../../services/create-user'
import { searchCep } from '../../services/search-cep'
import { clearMask } from '../../utils/clear-maks'

const userFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z.string().min(1, 'Whatsapp é obrigatório'),
  cep: z.string().min(1, 'CEP é obrigatório'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(2, 'UF inválido').max(2, 'UF inválido'),
  complement: z.string(),
})

export type UserFormData = z.infer<typeof userFormSchema>

const initialValues: UserFormData = {
  name: '',
  email: '',
  whatsapp: '',
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: '',
  complement: '',
}

export function Home() {
  const {
    control,
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

  const { mutateAsync: createUserFn } = useMutation({
    mutationFn: createUser,
  })

  const [searchingCep, setSearchingCep] = useState(false)

  const cep = watch('cep')

  async function handleSearchCep() {
    const cepValue = clearMask(cep)

    if (cepValue.length !== 8) {
      toast.error('CEP inválido')
      return
    }

    try {
      setSearchingCep(true)

      const data = await searchCep(cep)

      setValue('city', data.city)
      setValue('state', data.state)
      setValue('neighborhood', data.neighborhood)
      setValue('street', data.street)
    } catch (error) {
      toast.error('CEP não encontrado')
    } finally {
      setSearchingCep(false)
    }
  }

  async function handleSave(data: UserFormData) {
    try {
      await createUserFn({
        ...data,
        number: Number(data.number),
      })

      toast.success('Dados salvos com sucesso')
      reset(initialValues)
    } catch (error) {
      toast.error('Erro ao salvar dados')
    }
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

          <Controller
            control={control}
            name="whatsapp"
            render={({ field: { onBlur, onChange, value } }) => (
              <InputBase
                flex={1}
                label="Whatsapp"
                leftSection={<Phone size={20} />}
                component={IMaskInput}
                mask="(00) 00000-0000"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={errors.whatsapp?.message}
              />
            )}
          />

          <Flex gap="xs" align="flex-end">
            <Controller
              control={control}
              name="cep"
              render={({ field: { onBlur, onChange, value } }) => (
                <InputBase
                  flex={1}
                  label="CEP"
                  leftSection={<MapPin size={20} />}
                  component={IMaskInput}
                  mask="00000-000"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={errors.cep?.message}
                />
              )}
            />

            <ActionIcon
              type="button"
              h={36}
              w={36}
              variant="default"
              aria-label="Buscar CEP"
              onClick={handleSearchCep}
              mt={25}
              style={{ alignSelf: 'flex-start' }}
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
