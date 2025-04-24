import { useState } from 'react'
import Kanban from './KanbanView'
import { useMenu } from '@/Context/Menu'
import CampaignList from './CampaignList'
import { useData } from '@/Context/Data'
import moment from 'moment-jalaali'
import { useStates } from '@/Context/States'
const today = moment().format('jYYYY/jM/jD')
const Campaign = () => {
  const { campaignData } = useData()
  const [listStatus, setListStatus] = useState<string>('')
  const { menu } = useMenu()
  const { permissions } = useStates()
  return (
    <div>
      {permissions[1].includes('745') && menu === 'campaign' ? (
        <Kanban
          done={
            (Array.isArray(campaignData) &&
              campaignData?.filter((promo) =>
                moment(promo.start_date, 'jYYYY/jM/jD').isBefore(today)
              )) ||
            []
          }
          toDo={
            (Array.isArray(campaignData) &&
              campaignData?.filter((promo) =>
                moment(promo.start_date, 'jYYYY/jM/jD').isAfter(today)
              )) ||
            []
          }
          progress={
            (Array.isArray(campaignData) &&
              campaignData?.filter((promo) =>
                moment(promo.start_date, 'jYYYY/jM/jD').isSame(today)
              )) ||
            []
          }
          length={campaignData?.length || 0}
          setListStatus={setListStatus}
        />
      ) : menu === 'campaign-list' ? (
        <CampaignList
          status={listStatus}
          campaigns={
            listStatus === '3'
              ? (Array.isArray(campaignData) &&
                  campaignData?.filter((promo) =>
                    moment(promo.start_date, 'jYYYY/jM/jD').isBefore(today)
                  )) ||
                []
              : listStatus === '2'
              ? (Array.isArray(campaignData) &&
                  campaignData?.filter((promo) =>
                    moment(promo.start_date, 'jYYYY/jM/jD').isSame(today)
                  )) ||
                []
              : (Array.isArray(campaignData) &&
                  campaignData?.filter((promo) =>
                    moment(promo.start_date, 'jYYYY/jM/jD').isAfter(today)
                  )) ||
                []
          }
        />
      ) : (
        '' // ['new-promotion', 'edit-promotion'].includes(menu) && <AddCampaign />
      )}
    </div>
  )
}
export default Campaign
