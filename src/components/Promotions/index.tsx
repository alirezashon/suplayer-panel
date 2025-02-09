import { useState } from 'react'
import Kanban from './KanbanView'
import { useMenu } from '@/Context/Menu'
import PromotionList from './PromotionList'
import AddPromotion from './AddPromotion'
import { useData } from '@/Context/Data'
import moment from 'moment-jalaali'
import { Danger } from 'iconsax-react'
import PromotionView from './View'
const today = moment().format('jYYYY/jM/jD')
const Promotion = () => {
  const { promotionData } = useData()
  const [listStatus, setListStatus] = useState<string>('')
  
  const { menu } = useMenu()
  return (
    <div>
      {menu === 'promotion' ? (
        <Kanban
          done={
            promotionData?.filter((promo) =>
              moment(promo.start_date, 'jYYYY/jM/jD').isBefore(today)
            ) || []
          }
          toDo={
            promotionData?.filter((promo) =>
              moment(promo.start_date, 'jYYYY/jM/jD').isAfter(today)
            ) || []
          }
          progress={
            promotionData?.filter((promo) =>
              moment(promo.start_date, 'jYYYY/jM/jD').isSame(today)
            ) || []
          }
          length={promotionData?.length || 0}
          setListStatus={setListStatus}
        />
      ) : menu === 'promotion-list' ? (
        <PromotionList
          status={listStatus}
          promotions={
            listStatus === '3'
              ? promotionData?.filter((promo) =>
                  moment(promo.start_date, 'jYYYY/jM/jD').isBefore(today)
                ) || []
              : listStatus === '2'
              ? promotionData?.filter((promo) =>
                  moment(promo.start_date, 'jYYYY/jM/jD').isSame(today)
                ) || []
              : promotionData?.filter((promo) =>
                  moment(promo.start_date, 'jYYYY/jM/jD').isAfter(today)
                ) || []
          }
        />
      ) : 'promotion-view' === menu ? (
        <PromotionView />
      ) : (
        ['new-promotion', 'edit-promotion'].includes(menu) && <AddPromotion />
      )}
    </div>
  )
}
export default Promotion
