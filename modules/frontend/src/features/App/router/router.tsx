import { createBrowserRouter, redirect } from 'react-router'
import AppLayout from '@features/App/AppLayout'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, loader: () => redirect('/products') },
      {
        path: 'products',
        children: [
          {
            index: true,
            lazy: {
              Component: async () =>
                (await import('@features/Products/views/ProductListPage'))
                  .ProductListPage,
            },
            HydrateFallback: () => <p>Loading...</p>,
          },
          {
            path: ':productId',
            lazy: {
              Component: async () =>
                (await import('@features/Products/views/ProductDetailPage'))
                  .ProductDetailPage,
            },
            HydrateFallback: () => <p>Loading...</p>,
          },
        ],
      },
    ],
  },
])
