import { Container } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import { Header } from '../components/Header'

export function RootLayout() {
  return (
    <Container py="xl" size="md">
      <Header />
      <Outlet />
    </Container>
  )
}
