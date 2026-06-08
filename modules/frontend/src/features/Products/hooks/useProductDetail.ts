import { productRepository } from '@features/Products/services/productRepository'
import type { Product } from '@features/Products/types/product.types'
import { useEffect, useState } from 'react'

export interface UseProductDetail {
	product: Product | null
	error: Error | null
	isLoading: boolean
}

export const useProductDetail = (id: string): UseProductDetail => {
	const [product, setProduct] = useState<Product | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const loadProduct = async (): Promise<void> => {
			try {
				const product = await productRepository.getProductById(id)
				setProduct(product)
			} catch (error) {
				setError(
					error instanceof Error ? error : new Error('Error unknown')
				)
				console.log(
					error instanceof Error ? error.message : String(error)
				)
			}
			setIsLoading(false)
		}
		loadProduct()
	}, [id])

	return { product, error, isLoading }
}
