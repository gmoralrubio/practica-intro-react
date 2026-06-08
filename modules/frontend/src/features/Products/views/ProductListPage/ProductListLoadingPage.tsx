import { ProductCardSkeleton } from '@features/Products/components/ProductCardSkeleton'

export const ProductListLoadingPage: React.FC = () => {
  const loadingElements = []
  for (let i = 0; i < 20; i++) {
    loadingElements.push(<ProductCardSkeleton key={i} />)
  }
  return (
    <main className="grid grid-cols-1 gap-12 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {loadingElements.map((el) => el)}
    </main>
  )
}
