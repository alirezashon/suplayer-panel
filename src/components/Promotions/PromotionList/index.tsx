import { useMenu } from '@/Context/Menu'
import { PromotionInterface } from '@/interfaces'
import Done from '../PromotionCard/Done'
import Progress from '../PromotionCard/Progress'
import Wait from '../PromotionCard/Wait'
const PromotionList = ({
  promotions,
  status,
}: {
  promotions: PromotionInterface[]
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
                setMenu('promotion')
                location.hash = 'promotion'
              }}>
              پروموشن
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
          {promotions.map((promotion, index) =>
            status === '1' ? (
              <Wait key={index} promotion={promotion} />
            ) : status === '2' ? (
              <Progress key={index} promotion={promotion} />
            ) : (
              <Done key={index} promotion={promotion} />
            )
          )}
        </div>
      </div>
    </>
  )
}
export default PromotionList