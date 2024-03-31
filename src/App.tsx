import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from './router'

export function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Montserrat, sans-serif',
        primaryColor: 'pink',
      }}
    >
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </MantineProvider>
  )
}
