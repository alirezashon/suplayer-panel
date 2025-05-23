import { useState } from 'react'
import Kanban from './KanbanView'
import { useMenu } from '@/Context/Menu'
import PromotionList from './PromotionList'
import AddPromotion from './AddPromotion'
import { useData } from '@/Context/Data'
import moment from 'moment-jalaali'
import PromotionView from './View'
import { useStates } from '@/Context/States'
const today = moment().format('jYYYY/jM/jD')
const Promotion = () => {
  const { promotionData } = useData()
  const [listStatus, setListStatus] = useState<string>('')
  const { permissions } = useStates()
  const { menu } = useMenu()
  return (
    <div>
      {permissions[1].includes('744') && menu === 'promotion' ? (
        <Kanban
          done={
            (Array.isArray(promotionData) &&
              promotionData?.filter((promo) =>
                moment(promo.start_date, 'jYYYY/jM/jD').isBefore(today)
              )) ||
            []
          }
          toDo={
            (Array.isArray(promotionData) &&
              promotionData?.filter((promo) =>
                moment(promo.start_date, 'jYYYY/jM/jD').isAfter(today)
              )) ||
            []
          }
          progress={
            (Array.isArray(promotionData) &&
              promotionData?.filter((promo) =>
                moment(promo.start_date, 'jYYYY/jM/jD').isSame(today)
              )) ||
            []
          }
          length={promotionData?.length || 0}
          setListStatus={setListStatus}
        />
      ) : menu === 'promotion-list' ? (
        <PromotionList
          status={listStatus}
          promotions={
            listStatus === '3'
              ? (Array.isArray(promotionData) &&
                  promotionData?.filter((promo) =>
                    moment(promo.start_date, 'jYYYY/jM/jD').isBefore(today)
                  )) ||
                []
              : listStatus === '2'
              ? (Array.isArray(promotionData) &&
                  promotionData?.filter((promo) =>
                    moment(promo.start_date, 'jYYYY/jM/jD').isSame(today)
                  )) ||
                []
              : (Array.isArray(promotionData) &&
                  promotionData?.filter((promo) =>
                    moment(promo.start_date, 'jYYYY/jM/jD').isAfter(today)
                  )) ||
                []
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
