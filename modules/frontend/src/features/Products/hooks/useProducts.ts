import { productRepository } from '@features/Products/services/productRepository'
import type {
	Product,
	ProductCreateDTO,
} from '@features/Products/types/product.types'
import { useEffect, useState } from 'react'

interface UseProducts {
	products: Product[]
	error: Error | null
	isLoading: boolean
	handleAddProduct: (product: ProductCreateDTO) => void
	handleUpdateProduct: (product: Product) => void
	handleDeleteProduct: (id: string) => void
}

export const useProducts = (): UseProducts => {
	const [products, setProducts] = useState<Product[]>([])
	const [error, setError] = useState<Error | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const products = await productRepository.getAllProducts()
				setProducts(products)
			} catch (error) {
				setError(
					error instanceof Error ? error : new Error('Error unknown')
				)
				console.log(
					error instanceof Error ? error.message : String(error)
				)
			}
		}
		loadProducts()
	}, [])

	const handleAddProduct = async (
		product: ProductCreateDTO
	): Promise<void> => {
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

	const handleUpdateProduct = async (product: Product): Promise<void> => {
		try {
			setIsLoading(true)
			const updatedProduct = await productRepository.updateProduct(
				product.id,
				product
			)
			setProducts((prev) => [updatedProduct, ...prev])
		} catch (error: unknown) {
			setError(
				error instanceof Error ? error : new Error('Error unknown')
			)
			console.log(error instanceof Error ? error.message : String(error))
		} finally {
			setIsLoading(false)
		}
	}

	const handleDeleteProduct = async (id: string) => {
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
		handleAddProduct,
		handleUpdateProduct,
		handleDeleteProduct,
	}
}
