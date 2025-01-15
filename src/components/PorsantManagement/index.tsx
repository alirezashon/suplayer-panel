import { useMenu } from '@/Context/Menu'
import ShowGroups from './Groups'
import PorsantManagement from './ManageSubGroup'
import Allocation from './ManageSubGroup/Allocation'

const Porsant = () => {
  const { menu } = useMenu()
  return (
    <div>
      {menu === 'porsant' ? (
        <ShowGroups />
      ) : menu === 'porsantmanagement' ? (
        <PorsantManagement />
      ) : menu === 'allocation' ? (
        <Allocation />
      ) : (
        menu === 'release' && ''
      )}
    </div>
  )
}

export default Porsant
