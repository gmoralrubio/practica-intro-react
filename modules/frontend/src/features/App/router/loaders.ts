import { productRepository } from '@features/Products/services/productRepository'
import type { LoaderFunctionArgs } from 'react-router'

export const loadProducts = async () => {
	const products = await productRepository.getAllProducts()
	return { products }
}

export const loadProductDetail = async ({ params }: LoaderFunctionArgs) => {
	const productId = params.productId
	if (!productId) throw new Error('Product ID is required')

	const product = await productRepository.getProductById(productId)

	return { product }
}
