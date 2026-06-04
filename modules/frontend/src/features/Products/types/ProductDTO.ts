export interface ProductDTO {
	id: number
	name: string
	description: string
	price: number
	image: string
	isOnSale: boolean
	userId: number
	tags: string[]
	updatedAt: string
}
