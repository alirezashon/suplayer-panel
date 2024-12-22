import {
  ArrowLeft2,
  Box,
  Eye,
  MouseCircle,
  People,
  Personalcard,
  Profile2User,
  Timer,
} from 'iconsax-react'

const Dashboard = () => {
  const statsData = [
    {
      icon: <People size={22} color='#666BC9' />,
      title: 'گروه‌های فعال من',
      count: '۱۴',
      viewMoreIcon:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/c380da7f37f83772c706daa5a43b14fa99fff2077b61295622fcf1de840d41cf?placeholderIfAbsent=true&apiKey=9e60e2f053ac40dfb1c0cca86b2169b4',
    },
    {
      icon: <Profile2User size={22} color='#666BC9' />,
      title: 'بازاریاب‌های من',
      count: '۱۳۰',
      viewMoreIcon:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/422e0392e65816ccef6727c9a73359c0823f7f15d794fa613e2150558a7213ef?placeholderIfAbsent=true&apiKey=9e60e2f053ac40dfb1c0cca86b2169b4',
    },
    {
      icon: <Box size={22} color='#666BC9' />,
      title: 'محصول‌های من',
      count: '۳۰',
      viewMoreIcon:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/dee5073fcef179aa6974652a1f9b1d82efae1df406bd0037b74ff8a4c0ec1f9d?placeholderIfAbsent=true&apiKey=9e60e2f053ac40dfb1c0cca86b2169b4',
    },
  ]

  const promotionsData = [
    {
      timeRemaining: '۲۶:۴۳:۵۵',
      title: 'پروموشن محصولات فولیکا',
      slogan: 'مراقبت پوستی شما با ما',
      viewCount: '۶',
      clickCount: '۲۷',
    },
    {
      timeRemaining: '۲۶:۴۳:۵۵',
      title: 'پروموشن محصولات فولیکا',
      slogan: 'مراقبت پوستی شما با ما',
      viewCount: '۶',
      clickCount: '۲۷',
    },
    {
      timeRemaining: '۲۶:۴۳:۵۵',
      title: 'پروموشن محصولات فولیکا',
      slogan: 'مراقبت پوستی شما با ما',
      viewCount: '۶',
      clickCount: '۲۷',
    },
  ]
  return (
    <div className='flex flex-col m-5'>
      <div className='my-10 flex gap-4'>
        {statsData.map((stat, index) => (
          <div
            key={index}
            className='flex flex-col flex-1 p-6 bg-white rounded-xl border border-gray-200 shadow min-w-[240px] max-md:px-5'>
            <div className='flex justify-between items-center text-sm text-zinc-600'>
              <span>{stat.title}</span>
              {stat.icon}
            </div>
            <div className='flex justify-between items-center mt-6 text-zinc-900'>
              <span className='text-xl'>{stat.count}</span>
              <div className=' cursor-pointer flex items-center gap-2 text-[#7747C0]'>
                <span>مشاهده بیشتر</span>
                <ArrowLeft2 size={22} color='#7747C0' />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='text-lg font-bold text-right text-zinc-900 max-md:max-w-full'>
        پروموشن‌های در حال انجام
      </div>
      <div className='flex flex-wrap gap-6 items-center mt-6 w-full max-md:max-w-full'>
        {promotionsData.map((promotion, index) => (
          <div
            key={index}
            className='flex flex-col grow shrink justify-center self-stretch p-6 my-auto bg-white rounded-lg border-2 border-indigo-200 min-h-[192px] min-w-[240px] w-[286px] max-md:px-5'>
            {/* Title and Time */}
            <div className='flex justify-between items-center gap-10 w-full'>
              <div className='gap-2 px-2 py-2.5 text-sm font-bold text-purple-800 bg-purple-200 rounded-lg min-h-[40px]'>
                {promotion.title}
              </div>
              <div className='flex items-center gap-1'>
                <span className='text-sm font-medium text-zinc-950'>
                  {promotion.timeRemaining}
                </span>
                <Timer size={22} color='#704CB9' />
              </div>
            </div>
            <div className='flex items-center gap-2 mt-6'>
              <Personalcard size={22} color='#704CB9' />
              <span className='text-sm text-[#757575]'>شعار پروموشن:</span>
              <div className='text-sm font-medium leading-6 text-zinc-950'>
                {promotion.slogan}
              </div>
            </div>

            <div className='flex justify-between items-center gap-10 mt-6'>
              <div className='flex items-center gap-1'>
                <MouseCircle size={22} color='#704CB9' />
                <span className='text-xs text-neutral-500'>تعداد کلیک</span>
                <span className='text-xs text-zinc-950'>
                  {promotion.clickCount}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <Eye size={22} color='#704CB9' />
                <span className='text-xs text-neutral-500'>تعداد بازدید</span>
                <span className='text-xs text-zinc-950'>
                  {promotion.viewCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
