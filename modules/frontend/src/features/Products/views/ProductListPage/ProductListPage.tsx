import { useAuth } from '@features/Auth/hooks/useAuth'
import { useProducts } from '@features/Products/hooks/useProducts'
import type { Product } from '@features/Products/types/product.types'
import { formatDate, toEuro } from '@features/Products/utils/utils'
import { Badge } from '@shared/components/Badge'
import { useLoaderData } from 'react-router'

interface LoaderProducts {
  products: Product[]
}

const ProductListPage: React.FC = () => {
  const { products } = useLoaderData<LoaderProducts>()
  const { user } = useAuth()
  const { deleteProduct } = useProducts()

  const userProducts = products.filter(
    (product) => product.userId === Number(user?.id)
  )

  const handleDelete = (product: Product) => {
    if (window.confirm(`¿Eliminar "${product.name}"?`)) {
      deleteProduct(product.id)
    }
  }

  return (
    <main className="overflow-x-auto p-4">
      <table className="table-zebra table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Tags</th>
            <th>Actualizado</th>
            <th className="w-0"></th>
          </tr>
        </thead>
        <tbody>
          {userProducts.map((product) => (
            <tr key={product.id}>
              <td className="font-semibold">{product.name}</td>
              <td>{toEuro(product.price)}</td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag}
                      style="soft"
                      color="accent"
                      size="sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="text-nowrap">{formatDate(product.updatedAt)}</td>
              <td>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline btn-info btn-sm"
                    onClick={() => {
                      // TODO: implementar edición
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-error btn-sm"
                    onClick={() => handleDelete(product)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
export default ProductListPage
