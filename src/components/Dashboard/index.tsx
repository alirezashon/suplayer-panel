import { useData } from '@/Context/Data'
import { useMenu } from '@/Context/Menu'
import {
  ArrowLeft2,
  Box,
  Calendar,
  Danger,
  Eye,
  Moneys,
  MouseCircle,
  People,
  Personalcard,
  PresentionChart,
  Profile2User,
  StatusUp,
  Timer,
} from 'iconsax-react'

const Dashboard = () => {
  const {
    groupData,
    productData,
    beneficiaryData,
    referrerData,
    promotionData,
    campaignData,
  } = useData()
  const { setMenu } = useMenu()

  return (
    <div className='flex flex-col m-5'>
      <div className='my-10 flex gap-4'>
        <div className='h-fit flex flex-col flex-1 p-6 bg-white rounded-xl border border-gray-200 shadow min-w-[240px] max-md:px-5'>
          <div className='flex justify-between items-center text-sm text-zinc-600'>
            <span> گروه‌های فعال من</span>
            <People size={22} color='#666BC9' />
          </div>
          {groupData && groupData?.length > 0 ? (
            <div className='flex justify-between items-center mt-6 text-zinc-900'>
              <span className='text-xl'>{groupData?.length}</span>
              <div
                onClick={() => {
                  location.hash = 'mygroups'
                  setMenu('mygroups')
                }}
                className=' cursor-pointer flex items-center gap-2 text-[#7747C0]'>
                <span>مشاهده بیشتر</span>
                <ArrowLeft2 size={22} color='#7747C0' />
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-5 text-[#A9791C] mt-5'>
              <div className='flex gap-2'>
                <Danger color='#A9791C' size={18} />
                <p>شما هنوز گروه تعریف نکرده‌اید</p>
              </div>
              <button
                className='fill-button h-10 rounded-lg'
                onClick={() => {
                  setMenu('mygroups')
                  location.hash = 'mygroups'
                }}>
                تعریف گروه جدید
              </button>
            </div>
          )}
        </div>
        <div className='h-fit flex flex-col flex-1 p-6 bg-white rounded-xl border border-gray-200 shadow min-w-[240px] max-md:px-5'>
          <div className='flex justify-between items-center text-sm text-zinc-600'>
            <span>بازاریاب‌های من</span>
            <Profile2User size={22} color='#666BC9' />
          </div>
          {referrerData && referrerData?.length > 0 ? (
            <div className='flex justify-between items-center mt-6 text-zinc-900'>
              <span className='text-xl'>{referrerData?.length}</span>
              <div
                onClick={() => {
                  location.hash = 'referrers'
                  setMenu('referrers')
                }}
                className=' cursor-pointer flex items-center gap-2 text-[#7747C0]'>
                <span>مشاهده بیشتر</span>
                <ArrowLeft2 size={22} color='#7747C0' />
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-5 text-[#A9791C] mt-5'>
              <div className='flex gap-2'>
                <Danger color='#A9791C' size={18} />
                <p>شما هنوز بازاریاب‌ تعریف نکرده‌اید</p>
              </div>
              <button
                className='fill-button h-10 rounded-lg'
                onClick={() => {
                  setMenu('referrers')
                  location.hash = 'referrers'
                }}>
                تعریف بازاریاب جدید
              </button>
            </div>
          )}
        </div>

        <div className='h-fit flex flex-col flex-1 p-6 bg-white rounded-xl border border-gray-200 shadow min-w-[240px] max-md:px-5'>
          <div className='flex justify-between items-center text-sm text-zinc-600'>
            <span>ذی‌نفعان من</span>
            <Profile2User size={22} color='#666BC9' />
          </div>
          {beneficiaryData && beneficiaryData?.length > 0 ? (
            <div className='flex justify-between items-center mt-6 text-zinc-900'>
              <span className='text-xl'>{beneficiaryData?.length}</span>
              <div
                onClick={() => {
                  location.hash = 'beneficiary'
                  setMenu('beneficiary')
                }}
                className=' cursor-pointer flex items-center gap-2 text-[#7747C0]'>
                <span>مشاهده بیشتر</span>
                <ArrowLeft2 size={22} color='#7747C0' />
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-5 text-[#A9791C] mt-5'>
              <div className='flex gap-2'>
                <Danger color='#A9791C' size={18} />
                <p>شما هنوز ذی‌نفع تعریف نکرده‌اید</p>
              </div>
              <button
                className='fill-button h-10 rounded-lg'
                onClick={() => {
                  setMenu('beneficiary')
                  location.hash = 'beneficiary'
                }}>
                تعریف ذی‌نفع جدید
              </button>
            </div>
          )}
        </div>

        <div className='h-fit flex flex-col flex-1 p-6 bg-white rounded-xl border border-gray-200 shadow min-w-[240px] max-md:px-5'>
          <div className='flex justify-between items-center text-sm text-zinc-600'>
            <span>محصول‌های من</span>
            <Box size={22} color='#666BC9' />
          </div>
          {productData && productData?.length > 0 ? (
            <div className='flex justify-between items-center mt-6 text-zinc-900'>
              <span className='text-xl'>{productData?.length}</span>
              <div
                onClick={() => {
                  location.hash = 'productgroups'
                  setMenu('productgroups')
                }}
                className=' cursor-pointer flex items-center gap-2 text-[#7747C0]'>
                <span>مشاهده بیشتر</span>
                <ArrowLeft2 size={22} color='#7747C0' />
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-5 text-[#A9791C] mt-5'>
              <div className='flex gap-2'>
                <Danger color='#A9791C' size={18} />
                <p>شما هنوز محصول‌ تعریف نکرده‌اید</p>
              </div>
              <button
                className='fill-button h-10 rounded-lg'
                onClick={() => {
                  setMenu('products')
                  location.hash = 'products'
                }}>
                تعریف محصول‌ جدید
              </button>
            </div>
          )}
        </div>
      </div>
      {promotionData && promotionData?.length > 0 && (
        <div className='flex flex-col bg-white p-5 border rounded-lg'>
          <div className='flex gap-3 items-center'>
            <PresentionChart size={28} color='#7747C0' />
            <div className='text-lg font-bold text-right text-zinc-900 max-md:max-w-full'>
              پروموشن‌های در حال انجام
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full'>
            {promotionData?.map((promotion, index) => (
              <div
                key={index}
                className='flex flex-col justify-center p-6 my-auto rounded-lg border-2 border-[#B09CE9] min-h-[192px] w-full'>
                {/* Title and Time */}
                <div className='flex justify-between items-center gap-10 w-full'>
                  <div className='gap-2 px-2 py-2.5 text-sm font-bold text-purple-800 bg-purple-200 rounded-lg min-h-[40px]'>
                    {promotion.ctitle}
                  </div>
                  <div className='flex items-center gap-1'>
                    <span className='text-sm font-medium text-zinc-950'>
                      {promotion.pgroup_id}
                    </span>
                    <Timer size={22} color='#704CB9' />
                  </div>
                </div>
                <div className='flex items-center gap-2 mt-6'>
                  <Personalcard size={22} color='#704CB9' />
                  <span className='text-sm text-[#757575]'>شعار پروموشن:</span>
                  <div className='text-sm font-medium leading-6 text-zinc-950'>
                    {promotion.ctitle}
                  </div>
                </div>

                <div className='flex justify-between items-center gap-10 mt-6'>
                  <div className='flex items-center gap-1'>
                    <MouseCircle size={22} color='#704CB9' />
                    <span className='text-xs text-neutral-500'>تعداد کلیک</span>
                    <span className='text-xs text-zinc-950'>
                      {promotion.ctitle}
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Eye size={22} color='#704CB9' />
                    <span className='text-xs text-neutral-500'>
                      تعداد بازدید
                    </span>
                    <span className='text-xs text-zinc-950'>
                      {promotion.ctitle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {campaignData?.length ? (
        <div className='flex flex-col bg-white p-5 my-10 border rounded-lg'>
          <div className='flex gap-3 items-center'>
            <StatusUp size={28} color='#7747C0' />
            <div className='text-lg font-bold text-right text-zinc-900 max-md:max-w-full'>
              کمپین‌های در حال انجام
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full'>
            {campaignData?.map((campain, index) => (
              <div
                key={index}
                className='flex flex-col justify-center p-6 my-auto rounded-lg border-2 border-[#B09CE9] min-h-[192px] w-full'>
                <div className='flex justify-between items-center gap-10 w-full'>
                  <div className='gap-2 px-2 py-2.5 text-sm font-bold text-purple-800 bg-purple-200 rounded-lg min-h-[40px]'>
                    {campain.ctitle}
                  </div>
                  <div className='flex items-center gap-1'>
                    <span className='text-sm font-medium text-zinc-950'>
                      {campain.start_date}
                    </span>
                    <Timer size={22} color='#704CB9' />
                  </div>
                </div>
                <div className='flex items-center gap-2 mt-3 w-full justify-between'>
                  <div className='flex gap-1'>
                    <Calendar size={22} color='#704CB9' />
                    <span className='text-sm text-[#757575]'>تاریخ شروع </span>
                  </div>
                  <div className='text-sm font-medium leading-6 text-zinc-950'>
                    {campain.start_date}
                  </div>
                </div>

                <div className='flex items-center gap-2 mt-3 w-full justify-between'>
                  <div className='flex gap-1'>
                    <Calendar size={22} color='#704CB9' />
                    <span className='text-xs text-neutral-500'>
                      تاریخ پایان{' '}
                    </span>
                  </div>
                  <span className='text-xs text-zinc-950'>
                    {campain.exp_date}
                  </span>
                </div>
                <div className='flex items-center gap-2 mt-3 w-full justify-between'>
                  <div className='flex gap-1'>
                    <Moneys size={22} color='#704CB9' />
                    <span className='text-xs text-neutral-500'>بودجه </span>
                  </div>
                  <span className='text-xs text-zinc-950'>
                    {campain.budget}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Dashboard
