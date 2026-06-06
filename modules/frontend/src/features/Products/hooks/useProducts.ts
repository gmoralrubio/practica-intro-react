import { productRepository } from '@features/Products/services/productRepository'
import type {
	Product,
	ProductCreateDTO,
} from '@features/Products/types/product.types'
import { useEffect, useState } from 'react'

export interface UseProducts {
	products: Product[]
	error: Error | null
	isLoading: boolean
	addProduct: (product: ProductCreateDTO) => Promise<void>
	updateProduct: (product: Product) => Promise<void>
	deleteProduct: (id: string) => Promise<void>
}

export const useProducts = (): UseProducts => {
	const [products, setProducts] = useState<Product[]>([])
	const [error, setError] = useState<Error | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const loadProducts = async () => {
			try {
				setIsLoading(true)

				const products = await productRepository.getAllProducts()
				setProducts(products)
			} catch (error) {
				setError(
					error instanceof Error ? error : new Error('Error unknown')
				)
				console.log(
					error instanceof Error ? error.message : String(error)
				)
			} finally {
				setIsLoading(false)
			}
		}
		loadProducts()
	}, [])

	const addProduct = async (product: ProductCreateDTO): Promise<void> => {
		try {
			setIsLoading(true)
			const newProduct = await productRepository.addProduct(product)
			setProducts((prev) => [newProduct, ...prev])
		} catch (error: unknown) {
			setError(
				error instanceof Error ? error : new Error('Error unknown')
			)
			console.log(error instanceof Error ? error.message : String(error))
		} finally {
			setIsLoading(false)
		}
	}

	const updateProduct = async (product: Product): Promise<void> => {
		try {
			setIsLoading(true)
			const updatedProduct = await productRepository.updateProduct(
				product.id,
				product
			)
			setProducts((prev) =>
				prev.map((p) =>
					p.id === updatedProduct.id ? updatedProduct : p
				)
			)
		} catch (error: unknown) {
			setError(
				error instanceof Error ? error : new Error('Error unknown')
			)
			console.log(error instanceof Error ? error.message : String(error))
		} finally {
			setIsLoading(false)
		}
	}

	const deleteProduct = async (id: string) => {
		try {
			setIsLoading(true)
			await productRepository.deleteProduct(id)
			const updatedProducts = products.filter((p) => p.id !== id)
			setProducts(updatedProducts)
		} catch (error) {
			setError(
				error instanceof Error ? error : new Error('Error unknown')
			)
			console.log(error instanceof Error ? error.message : String(error))
		}
	}

	return {
		products,
		error,
		isLoading,
		addProduct,
		updateProduct,
		deleteProduct,
	}
}
