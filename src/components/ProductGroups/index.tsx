import React, { useState } from 'react'
import ProductGroups from './Groups'
import Brands from './Brands'
import { ProductGroupData } from '@/interfaces'

const ProductGroupsPage = () => {
  const [showBrand, setShowBrand] = useState<ProductGroupData | null>()
  return (
    <div>
      {showBrand ? (
        <Brands data={showBrand} />
      ) : (
        <ProductGroups setBrand={setShowBrand} />
      )}
    </div>
  )
}

export default ProductGroupsPage
