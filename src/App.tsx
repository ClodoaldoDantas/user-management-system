import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'

import { Home } from './pages/Home'

export function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Montserrat, sans-serif',
        primaryColor: 'pink',
      }}
    >
      <Home />
    </MantineProvider>
  )
}
