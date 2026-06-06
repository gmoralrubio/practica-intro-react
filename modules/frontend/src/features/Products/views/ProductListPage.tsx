import { ProductCard } from '@features/Products/components/ProductCard'
import { useProducts } from '@features/Products/hooks/useProducts'
import { ProductListLoadingPage } from '@features/Products/views/ProductListLoadingPage'

const ProductListPage: React.FC = () => {
  const { products, error, isLoading } = useProducts()

  return (
    <>
      {isLoading && <ProductListLoadingPage />}
      {error && <p>{error.message}</p>}
      <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </main>
    </>
  )
}
export default ProductListPage
