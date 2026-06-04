import { createBrowserRouter, redirect } from 'react-router'
import ProductListPage from '@features/Products/views/ProductListPage'
import Layout from '@features/App/AppLayout'
import ProductDetailPage from '@features/Products/views/ProductDetailPage'

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
