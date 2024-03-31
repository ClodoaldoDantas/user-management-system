import { Container } from '@mantine/core'
import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <Container py="xl" size="md">
      <Outlet />
    </Container>
  )
}
