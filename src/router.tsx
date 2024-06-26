import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from './layouts/Root'
import { Home } from './pages/Home'
import { Users } from './pages/Users'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/users',
        element: <Users />,
      },
    ],
  },
])
