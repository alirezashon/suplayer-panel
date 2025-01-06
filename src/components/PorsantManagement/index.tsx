import { useMenu } from '@/Context/Menu'
import ShowGroups from './Groups'
import PorsantManagement from './ManageSubGroup'

const Porsant = () => {
  const { menu } = useMenu()
  return (
    <div>
      {menu === 'porsant' ? (
        <ShowGroups />
      ) : (
        menu === 'porsantmanagement' && <PorsantManagement/>
      )}
    </div>
  )
}

export default Porsant
