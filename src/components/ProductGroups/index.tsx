import ProductGroups from './Groups'
import Brands from './Brands'
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
