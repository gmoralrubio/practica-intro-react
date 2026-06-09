import { mapProduct } from '@features/Products/services/productMapper'
import type {
	Product,
	ProductCreateDTO,
	ProductResponseDTO,
} from '@features/Products/types/product.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_URL = `${API_BASE_URL}/products`
// TODO:
const token = '123'

export const productRepository = {
	getAllProducts: async (): Promise<Product[]> => {
		const response = await fetch(`${API_URL}?_expand=user`)
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}

		const data = await response.json()
		return data.map(mapProduct)
	},

	getProductById: async (id: string): Promise<Product> => {
		const response = await fetch(`${API_URL}/${id}?_expand=user`)
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}
		const data: ProductResponseDTO = await response.json()
		return mapProduct(data)
	},

	addProduct: async (product: ProductCreateDTO): Promise<Product> => {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${token}`,
				body: JSON.stringify(product),
			},
		})
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}
		const data: ProductResponseDTO = await response.json()
		return mapProduct(data)
	},

	updateProduct: async (id: string, product: Product): Promise<Product> => {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(product),
		})
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}
		const data: ProductResponseDTO = await response.json()
		return mapProduct(data)
	},

	deleteProduct: async (id: string): Promise<void> => {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}
	},
}
