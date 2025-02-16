import { useMenu } from '@/Context/Menu'
import ShowGroups from './Groups'
import PorsantManagement from './ManageSubGroup'
import Allocation from './ManageSubGroup/Allocation'
import Release from './ManageSubGroup/Release'
import Reports from './ManageSubGroup/Reports'

const Porsant = () => {
  const { menu } = useMenu()
  return (
    <div>
      {menu === 'porsant' ? (
        <ShowGroups />
      ) : menu === 'porsantmanagement' ? (
        <PorsantManagement />
      ) : menu === 'reports' ? (
        <Reports />
      ) : menu === 'allocation' ? (
        <Allocation />
      ) : (
        menu === 'release' && <Release />
      )}
    </div>
  )
}

export default Porsant
