import { createBrowserRouter, redirect } from 'react-router'
import AppLayout from '@features/App/AppLayout'
import { lazy, Suspense } from 'react'
import { ProductListLoadingPage } from '@features/Products/views/ProductListLoadingPage'

const ProductListPage = lazy(
  () => import('@features/Products/views/ProductListPage')
)
const ProductDetailPage = lazy(
  () => import('@features/Products/views/ProductDetailPage')
)

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
            element: (
              <Suspense fallback={<ProductListLoadingPage />}>
                <ProductListPage />
              </Suspense>
            ),
          },
          {
            path: ':productId',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <ProductDetailPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
])
