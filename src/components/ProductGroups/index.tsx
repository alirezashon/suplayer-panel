import { useState } from 'react'
import ProductGroups from './Groups'
import Brands from './Brands'
import { ProductGroupData } from '@/interfaces'
import { useStates } from '@/Context/States'

const ProductGroupsPage = () => {
  const { productGroupStates } = useStates()
  return (
    <div>
      {productGroupStates === 'product-brands' ? <Brands /> : <ProductGroups />}
    </div>
  )
}

export default ProductGroupsPage
