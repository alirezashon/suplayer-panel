import { useState } from 'react'
import Kanban from './KanbanView'
import { useMenu } from '@/Context/Menu'
import { PromotionInterface } from '@/interfaces'
import PromotionList from './PromotionList'
import AddPromotion from './AddPromotion'
import { useData } from '@/Context/Data'
import moment from 'moment-jalaali'
import { Danger } from 'iconsax-react'
const today = moment().format('jYYYY/jM/jD')
const Promotion = () => {
  const { promotionData } = useData()

  const [listStatus, setListStatus] = useState<string>('')

  const { menu } = useMenu()
  return (
    <div>
      <div className='bg-[#F6F2CB] px-7 py-2'>
        <p className='font-bold'>قوانین و مسئولیت‌ها</p>
        <div className='flex px-7 py-2'>
          <Danger color='#A9791C' size={28} />
          <p className='text-[#8D5C1B] '>
            سایت امکان تعریف کمپین و پروموشن و نمایش آن در گروه‌های موردنظر را
            فراهم می‌کند. بااین‌حال، مسئولیت کامل محتوا، شرایط، و پیامدهای این
            کمپین‌ها بر عهده تعریف‌کننده است.
            <br />
            سایت صرفاً بستر ارائه این خدمات را فراهم می‌کند و هیچ مسئولیتی در
            قبال نتایج، عواقب جانبی، یا مغایرت‌های احتمالی ندارد.
          </p>
        </div>
      </div>
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
      ) : (
        ['new-promotion', 'edit-promotion'].includes(menu) && <AddPromotion />
      )}
    </div>
  )
}
export default Promotion
