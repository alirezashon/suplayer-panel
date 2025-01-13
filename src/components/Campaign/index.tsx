import { useState } from 'react'
import Kanban from './KanbanView'
import { useMenu } from '@/Context/Menu'
import { CampaignInterface } from '@/interfaces'
import CampaignList from './CampaignList'
import AddCampaign from './AddCampaign'

const campaign: CampaignInterface[] = [
  {
    type: 'پیامک انبوه',
    name: 'کمپین پیامک محصول',
    smsType: 'اطلاع‌رسانی',
    productCampaign: 'کمپین تبلیغاتی',
    startDate: '۱۴۰۳/۱۰/۱۰',
    endDate: '۱۴۰۳/۱۰/۲۳',
    country: 'ایران',
    province: 'تهران',
    city: 'تهران',
    county: 'شمیرانات',
    budget: '۲۰۰.۰۰۰.۰۰۰.۰۰۰ ریال',
    expectedResponse: '۲۰۰.۰۰۰.۰۰۰.۰۰۰ ریال',
    description: 'این کمپین برای بهبود رفتاری ذی‌نفعان طراحی شده است',
    status: '1',
    selectedGroups: ['زیرگروه اوه', 'زیرگروه فولیکا', 'گروه شامپو'],
    joinedBrands: ['فولیکا', 'اوه'],
    category: 'گروه مو',
  },
  {
    type: 'کمپین ایمیلی',
    name: 'کمپین ایمیل مشتریان',
    smsType: 'تعامل با مشتریان',
    productCampaign: 'کمپین تخفیف ویژه',
    startDate: '۱۴۰۳/۰۹/۱۵',
    endDate: '۱۴۰۳/۱۰/۰۵',
    country: 'ایران',
    province: 'اصفهان',
    city: 'اصفهان',
    county: 'اصفهان',
    budget: '۵۰.۰۰۰.۰۰۰.۰۰۰ ریال',
    expectedResponse: '۱۰۰.۰۰۰.۰۰۰.۰۰۰ ریال',
    description: 'کمپین برای افزایش فروش در بازه تخفیف‌ها طراحی شده است',
    status: '2',
    selectedGroups: ['زیرگروه آقایان', 'زیرگروه بانوان'],
    joinedBrands: ['فولیکا', 'داو'],
    category: 'گروه آرایشی و بهداشتی',
  },
  {
    type: 'کمپین ایمیلی',
    name: 'کمپین ایمیل مشتریان',
    smsType: 'تعامل با مشتریان',
    productCampaign: 'کمپین تخفیف ویژه',
    startDate: '۱۴۰۳/۰۹/۱۵',
    endDate: '۱۴۰۳/۱۰/۰۵',
    country: 'ایران',
    province: 'اصفهان',
    city: 'اصفهان',
    county: 'اصفهان',
    budget: '۵۰.۰۰۰.۰۰۰.۰۰۰ ریال',
    expectedResponse: '۱۰۰.۰۰۰.۰۰۰.۰۰۰ ریال',
    description: 'کمپین برای افزایش فروش در بازه تخفیف‌ها طراحی شده است',
    status: '3',
    selectedGroups: ['زیرگروه آقایان', 'زیرگروه بانوان'],
    joinedBrands: ['فولیکا', 'داو'],
    category: 'گروه آرایشی و بهداشتی',
  },
]
const Campaign = () => {
  const [done] = useState<CampaignInterface[]>(
    campaign.filter((promo) => promo.status === '3')
  )
  const [toDo] = useState<CampaignInterface[]>(
    campaign.filter((promo) => promo.status === '1')
  )
  const [progress] = useState<CampaignInterface[]>(
    campaign.filter((promo) => promo.status === '2')
  )
  const [listStatus, setListStatus] = useState<string>('')

  const { menu } = useMenu()
  return (
    <div>
      {menu === 'campaign' ? (
        <Kanban
          done={done}
          toDo={toDo}
          progress={progress}
          length={campaign.length}
          setListStatus={setListStatus}
        />
      ) : menu === 'campaign-list' ? (
        <CampaignList
          status={listStatus}
          campaigns={
            listStatus === '3' ? done : listStatus === '2' ? progress : toDo
          }
        />
      ) : (
        ['new-promotion', 'edit-promotion'].includes(menu) && <AddCampaign />
      )}
    </div>
  )
}
export default Campaign
