import { productRepository } from '@features/Products/services/productRepository'
import { buildFilterQuery } from '@features/Products/utils/utils'
import type { LoaderFunctionArgs } from 'react-router'

export const loadProducts = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url)
	const query = buildFilterQuery(url.searchParams)
	const products = await productRepository.getAllProducts(query)
	return { products }
}

export const loadProductDetail = async ({ params }: LoaderFunctionArgs) => {
	const productId = params.productId
	if (!productId) throw new Error('Product ID is required')

	const product = await productRepository.getProductById(productId)

	return { product }
}
