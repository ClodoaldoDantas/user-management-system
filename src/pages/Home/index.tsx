import { Container } from '@mantine/core'

import { UserForm } from './components/UserForm'

export function Home() {
  return (
    <Container py="xl" size="md">
      <UserForm />
    </Container>
  )
}
