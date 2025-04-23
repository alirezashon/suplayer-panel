import { useMenu } from '@/Context/Menu'
import ShowGroups from './Groups'
import PorsantManagement from './ManageSubGroup'
import Allocation from './ManageSubGroup/Allocation'
import Release from './ManageSubGroup/Release'
import Reports from './ManageSubGroup/Reports'
import { useStates } from '@/Context/States'

const Porsant = () => {
  const { menu } = useMenu()
  const { permissions } = useStates()
  return (
    <div>
      {menu === 'porsant' ? (
        permissions[1].includes('750') && <ShowGroups />
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
