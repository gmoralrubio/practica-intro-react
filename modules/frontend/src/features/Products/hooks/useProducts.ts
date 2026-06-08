import { productRepository } from '@features/Products/services/productRepository'
import type {
	Product,
	ProductCreateDTO,
} from '@features/Products/types/product.types'
import { useState } from 'react'
import { useRevalidator } from 'react-router'

export interface UseProducts {
	isMutating: boolean
	addProduct: (product: ProductCreateDTO) => Promise<void>
	updateProduct: (product: Product) => Promise<void>
	deleteProduct: (id: string) => Promise<void>
}

export const useProducts = (): UseProducts => {
	// Permite controlar los cambios de estado (disable button, etc.)
	const [isMutating, setIsMutating] = useState(false)
	// Recarga los datos despues de una mutación, reejecuta el loader de la ruta
	const revalidator = useRevalidator()

	const addProduct = async (product: ProductCreateDTO): Promise<void> => {
		try {
			setIsMutating(true)
			await productRepository.addProduct(product)
			revalidator.revalidate()
		} catch (error: unknown) {
			console.log(error instanceof Error ? error.message : String(error))
		}
		setIsMutating(false)
	}

	const updateProduct = async (product: Product): Promise<void> => {
		try {
			setIsMutating(true)
			await productRepository.updateProduct(product.id, product)
			revalidator.revalidate()
		} catch (error: unknown) {
			console.log(error instanceof Error ? error.message : String(error))
		}
		setIsMutating(false)
	}

	const deleteProduct = async (id: string) => {
		try {
			setIsMutating(true)
			await productRepository.deleteProduct(id)
			revalidator.revalidate()
		} catch (error) {
			console.log(error instanceof Error ? error.message : String(error))
		}
		setIsMutating(false)
	}

	return {
		isMutating,
		addProduct,
		updateProduct,
		deleteProduct,
	}
}
