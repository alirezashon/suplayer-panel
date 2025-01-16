import { useMenu } from '@/Context/Menu'
import ShowGroups from './Groups'
import PorsantManagement from './ManageSubGroup'
import Allocation from './ManageSubGroup/Allocation'
import Release from './ManageSubGroup/Release'

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
        menu === 'release' && <Release/>
      )}
    </div>
  )
}

export default Porsant
