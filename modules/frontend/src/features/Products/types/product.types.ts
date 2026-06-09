export type Tag = 'sport' | 'home' | 'tech' | 'Unknown'

// Domain
export interface Product {
	id: string
	name: string
	description: string
	price: number
	image?: string
	isOnSale: boolean
	userId: number
	username: string
	tags: Tag[]
	updatedAt: Date
}

// Se envía a API en creación producto
export interface ProductCreateDTO {
	name: string
	description: string
	price: number
	image?: string
	isOnSale: boolean
	tags: string[]
}

// Respuesta API
export interface ProductResponseDTO {
	id: string
	name: string
	description: string
	price: number
	image?: string
	isOnSale: boolean
	userId: number
	user: { id: number; password: string; username: string }
	tags: string[]
	updatedAt: string
}
