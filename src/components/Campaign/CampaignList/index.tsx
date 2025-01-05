import { useMenu } from '@/Context/Menu'
import { CampaignInterface } from '@/interfaces'
import Done from '../CampaignCard/Done'
import Progress from '../CampaignCard/Progress'
import Wait from '../CampaignCard/Wait'

const CampaignList = ({
  campaigns,
  status,
}: {
  campaigns: CampaignInterface[]
  status: string
}) => {
  const { setMenu } = useMenu()

  return (
    <>
      <div className='flex flex-col p-5'>
        <div className='flex justify-between items-center mb-7'>
          <p className='cursor-pointer'>
            <span
              className='text-[#98A2B3]'
              onClick={() => {
                setMenu('campaign')
                location.hash = 'campaign'
              }}>
              کمپین
            </span>
            /
            <span className='text-[#7747C0]'>
              {status === '1'
                ? 'شروع نشده'
                : status === '2'
                ? 'در حال انجام '
                : 'تمام شده ۳'}
            </span>
          </p>
        </div>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(25%,1fr))] gap-6 p-6 bg-white rounded-lg border border-gray-200'>
          {campaigns.map((campaign, index) =>
            status === '1' ? (
              <Wait key={index} campaign={campaign}/>
            ) : status === '2' ? (
              <Progress key={index} campaign={campaign} />
            ) : (
              <Done key={index} campaign={campaign} />
            )
          )}
        </div>
      </div>
    </>
  )
}

export default CampaignList
