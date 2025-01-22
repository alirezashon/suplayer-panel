import { useState } from 'react'
import ProductGroups from './Groups'
import Brands from './Brands'
import { ProductGroupData } from '@/interfaces'
import { useStates } from '@/Context/States'

const ProductGroupsPage = () => {
  const { productGroupStates } = useStates()
  const [showBrand, setShowBrand] = useState<ProductGroupData>()
  return (
    <div>
      {productGroupStates === 'product-brands' ? (
        <Brands data={showBrand as ProductGroupData} />
      ) : (
        <ProductGroups setBrand={setShowBrand} />
      )}
    </div>
  )
}

export default ProductGroupsPage
