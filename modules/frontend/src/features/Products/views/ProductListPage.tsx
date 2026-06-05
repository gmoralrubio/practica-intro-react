import { ProductCard } from '@features/Products/components/ProductCard'
import { useProducts } from '@features/Products/hooks/useProducts'

export const ProductListPage: React.FC = () => {
  const { products } = useProducts()

  return (
    <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </main>
  )
}
