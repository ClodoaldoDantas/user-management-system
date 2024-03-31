import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { Toaster } from 'sonner'

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
      <Toaster position="top-right" richColors closeButton />
    </MantineProvider>
  )
}
