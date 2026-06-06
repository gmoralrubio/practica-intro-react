import { useProductDetail } from '@features/Products/hooks/useProductDetail'
import { useParams } from 'react-router'

const ProductDetailPage: React.FC = () => {
  const params = useParams()
  const productId = params['productId']

  if (!productId) return <h1>Product id not valid</h1>

  const { product, error, isLoading } = useProductDetail(productId)

  return (
    <>
      {isLoading && <p>Cargando</p>}
      {error && <p>{error.message}</p>}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex justify-center">
              <img
                src={product?.image}
                alt={product?.name}
                className="aspect-square rounded-lg object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="badge badge-soft badge-secondary badge-lg"></span>
                </div>

                <h1 className="card-title mb-4 text-3xl font-bold">
                  {product?.name}
                </h1>

                <div className="mb-6">
                  <p className="text-primary text-3xl">{product?.price}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-md mb-2 font-medium">Descripción</h2>
                  <p className="text-base-content/80 leading-relaxed">
                    {product?.description}
                  </p>
                </div>
                <div className="mb-6 flex gap-2">
                  {product?.tags.map((tag) => (
                    <div
                      key={tag}
                      className="badge badge-outline badge-accent"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="divider"></div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-base-content/60">Propietario</p>
                    <p className="font-semibold"></p>
                  </div>
                  <div>
                    <p className="text-base-content/60">Publicado</p>
                    <p className="font-semibold"></p>
                  </div>
                </div>
              </div>

              <div className="product-action-container mt-8 flex gap-3"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <a
          href="index.html"
          className="btn btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al listado
        </a>
      </div>
    </>
  )
}

export default ProductDetailPage
