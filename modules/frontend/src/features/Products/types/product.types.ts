export type Tag = 'sport' | 'home' | 'tech' | 'Unknown'

// Domain
export interface Product {
	id: string
	name: string
	description: string
	price: number
	image: string
	isOnSale: boolean
	userId: number
	tags: Tag[]
	updatedAt: Date
}

// Se envía a API en creación producto
export interface ProductCreateDTO {
	name: string
	description: string
	price: number
	image: string
	isOnSale: boolean
	tags: string[]
}

// Se envía a API en edición producto
export type ProductUpdateDTO = Partial<Product>

// Respuesta API
export interface ProductResponseDTO {
	id: string
	name: string
	description: string
	price: number
	image: string
	isOnSale: boolean
	userId: number
	tags: string[]
	updatedAt: string
}
