import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { queryClient } from './lib/query-client'
import { router } from './router'

export function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Montserrat, sans-serif',
        primaryColor: 'pink',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors closeButton />
      </QueryClientProvider>
    </MantineProvider>
  )
}
