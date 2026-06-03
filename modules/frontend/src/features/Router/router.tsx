import { createBrowserRouter, redirect } from 'react-router'
import ProductListPage from '@features/ProductListPage/ProductListPage.tsx'
import Layout from '@shared/components/Layout'
import ProductDetailPage from '@features/ProductDetailPage/ProductDetailPage'

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, loader: () => redirect('/products') },
      {
        path: 'products',
        children: [
          { index: true, Component: ProductListPage },
          { path: ':productId', Component: ProductDetailPage },
        ],
      },
    ],
  },
])
