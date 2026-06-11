import type { Product } from '@features/Products/types/product.types'
import { useState } from 'react'

interface Props {
  product: Product
  isMutating: boolean
  editProduct: (product: Product) => void
  closeDialog: () => void
}

interface ProductUpdateDTO {
  name?: string
  price?: string
  isOnSale?: boolean
  description?: string
  image?: string
  tags?: string[]
}

export const ProductEditForm: React.FC<Props> = ({
  product,
  isMutating,
  closeDialog,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const price = formData.get('password') as string
    const isOnSale = formData.get('isOnSale') as string
    const description = formData.get('description') as string
    const image = formData.get('image') as string
    const tags = formData.get('tags') as string

    const updatedProduct = {}
  }

  return (
    <form
      method="dialog"
      onSubmit={handleSubmit}
    >
      <fieldset className="fieldset">
        <label
          htmlFor="name"
          className="label"
        >
          Product name
        </label>
        <input
          type="text"
          name="name"
          id="product-name"
          className="input w-full"
          placeholder="Product name"
          onChange={handleChange}
          value={updatedProduct.name}
          required
        />
      </fieldset>

      <div className="flex gap-4">
        <fieldset className="fieldset flex-1">
          <label
            htmlFor="price"
            className="label"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="product-price"
            step="0.01"
            className="input w-full"
            placeholder="Price"
            min="1"
            onChange={handleChange}
            value={product.price}
            required
          />
        </fieldset>

        <fieldset className="fieldset flex-1">
          <label
            htmlFor="isOnSale"
            className="label"
          >
            Is on sale
            <input
              type="checkbox"
              defaultChecked
              className="toggle"
            />
          </label>
        </fieldset>
      </div>

      <fieldset className="fieldset">
        <label
          htmlFor="description"
          className="label"
        >
          Description
        </label>
        <textarea
          className="textarea h-24 w-full"
          placeholder="Description"
          id="product-description"
          name="description"
          required
          onChange={handleChange}
        >
          {product.description}
        </textarea>
      </fieldset>

      <fieldset className="fieldset">
        <label
          htmlFor="image"
          className="label"
        >
          Image (optional)
        </label>

        <input
          type="text"
          name="image"
          id="product-image"
          placeholder="https://"
          className="input w-full"
          onChange={handleChange}
          value={product.image}
        />
      </fieldset>

      <div className="mt-4 space-x-4">
        <button
          type="submit"
          className="btn btn-info"
          disabled={isMutating}
        >
          {isMutating ? 'Updating...' : 'Update'}
        </button>
        <button
          type="button"
          className="btn"
          onClick={closeDialog}
        >
          Close
        </button>
      </div>
    </form>
  )
}
