import { createBrowserRouter, redirect } from 'react-router'
import AppLayout from '@features/App/AppLayout'
import { ProductListLoadingPage } from '@features/Products/views/ProductListPage/ProductListLoadingPage'
import { loadProductDetail, loadProducts } from '@features/App/router/loaders'
import ProductDetailPage from '@features/Products/views/ProductDetailPage/ProductDetailPage'
import ProductListPage from '@features/Products/views/ProductListPage/ProductListPage'
import { ProductDetailLoadingPage } from '@features/Products/views/ProductDetailPage/ProductDetailLoadingPage'

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
            loader: loadProducts,
            HydrateFallback: ProductListLoadingPage,
            errorElement: <p>Error al cargar los productos</p>,
            Component: ProductListPage,
          },
          {
            path: ':productId',
            loader: loadProductDetail,
            HydrateFallback: ProductDetailLoadingPage,
            errorElement: <p>Error al cargar el producto</p>,
            Component: ProductDetailPage,
          },
        ],
      },
    ],
  },
])
