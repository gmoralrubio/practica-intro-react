import type { Product, Tag } from '@features/Products/types/ProductTypes'
import type { ProductDTO } from '@features/Products/types/ProductDTO'

const TAGS: Tag[] = ['sport', 'home', 'tech']

const isTag = (value: string): value is Tag => {
	return (TAGS as string[]).includes(value)
}
const mapTags = (apiTags: string[]): Tag[] => {
	return apiTags.filter(isTag)
}
export function mapProduct(dto: ProductDTO): Product {
	return {
		id: dto.id,
		name: dto.name,
		description: dto.description,
		price: dto.price,
		image: dto.image,
		isOnSale: dto.isOnSale,
		userId: dto.userId,
		tags: mapTags(dto.tags),
		updatedAt: new Date(dto.updatedAt),
	}
}
