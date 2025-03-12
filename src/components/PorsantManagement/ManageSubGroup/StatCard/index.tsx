const StatCard: React.FC<{
  title: string
  value: string
  Icon: React.ElementType
  backgroundImage: string
}> = ({ title, value, Icon, backgroundImage }) => {
  return (
    <div
      className='flex flex-col justify-between  p-4 rounded-lg shadow-md cursor-pointer'
      style={{
        background: `url(${backgroundImage}) no-repeat center`,
        backgroundSize: 'cover',
      }}>
      <div className='flex items-center gap-2'>
        <Icon size={24} color='#50545F' />
        <span className=''>{title}</span>
      </div>
      <span className='mt-4 text-[#8455D2]'>{value}</span>
    </div>
  )
}
export default StatCard