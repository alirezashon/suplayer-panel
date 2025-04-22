import { useState, useEffect } from 'react'
import Image from 'next/image'
import first from '@/public/images/yarozhel.png'
import second from '@/public/images/darozhel.png'
const images = [first, second]
const Carousel: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [currentImage, setCurrentImage] = useState(images[0]) // نگهداری عکس فعلی
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true)
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length)
        setCurrentImage(images[(index + 1) % images.length]) // تغییر عکس بعدی
        setFade(false)
      }, 400) // مدت زمان انیمیشن فید
    }, 3000) // مدت زمان نمایش هر عکس

    return () => clearInterval(interval)
  }, [index]) // وابستگی روی ایندکس

  return (
    <div className='relative w-full h-[300px] max-md:h-[164px] overflow-hidden flex items-center justify-center'>
      <div
        className={`relative w-full h-full transition-opacity duration-1000 ${
          fade ? 'opacity-0' : 'opacity-100'
        }`}>
        <Image
          src={currentImage}
          alt={`slide-${index}`}
          className='rounded-lg  h-[300px] max-md:h-[164px]  '
        />
      </div>
    </div>
  )
}
export default Carousel 
