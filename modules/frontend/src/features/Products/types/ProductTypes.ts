export type Tag = 'sport' | 'home' | 'tech' | 'Unknown'

export interface Product {
	id: number
	name: string
	description: string
	price: number
	image: string
	isOnSale: boolean
	userId: number
	tags: Tag[]
	updatedAt: Date
}
