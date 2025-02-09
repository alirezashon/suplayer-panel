import { useState } from 'react'
import Kanban from './KanbanView'
import { useMenu } from '@/Context/Menu'
import CampaignList from './CampaignList'
import { useData } from '@/Context/Data'
import moment from 'moment-jalaali'
const today = moment().format('jYYYY/jM/jD')
const Campaign = () => {
  const { campaignData } = useData()
  const [listStatus, setListStatus] = useState<string>('')
  const { menu } = useMenu()
  return (
    <div>
      {menu === 'campaign' ? (
        <Kanban
          done={
            campaignData?.filter((promo) =>
              moment(promo.start_date, 'jYYYY/jM/jD').isBefore(today)
            ) || []
          }
          toDo={
            campaignData?.filter((promo) =>
              moment(promo.start_date, 'jYYYY/jM/jD').isAfter(today)
            ) || []
          }
          progress={
            campaignData?.filter((promo) =>
              moment(promo.start_date, 'jYYYY/jM/jD').isSame(today)
            ) || []
          }
          length={campaignData?.length || 0}
          setListStatus={setListStatus}
        />
      ) : menu === 'campaign-list' ? (
        <CampaignList
          status={listStatus}
          campaigns={
            listStatus === '3'
              ? campaignData?.filter((promo) =>
                  moment(promo.start_date, 'jYYYY/jM/jD').isBefore(today)
                ) || []
              : listStatus === '2'
              ? campaignData?.filter((promo) =>
                  moment(promo.start_date, 'jYYYY/jM/jD').isSame(today)
                ) || []
              : campaignData?.filter((promo) =>
                  moment(promo.start_date, 'jYYYY/jM/jD').isAfter(today)
                ) || []
          }
        />
      ) : (
        '' // ['new-promotion', 'edit-promotion'].includes(menu) && <AddCampaign />
      )}
    </div>
  )
}
export default Campaign
