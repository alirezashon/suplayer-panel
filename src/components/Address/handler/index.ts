import { RefObject } from 'react'
import toast from 'react-hot-toast'

export interface SearchAddress {
  title: string
  x: number
  y: number
}

export const searchAddress = async (
  value: string,
  setAddresses: (value: SearchAddress[]) => void
) => {
  try {
    const response = await fetch(
      `https://api.neshan.org/v1/search?term=${value}&lat=35.6999053&lng=51.3355413`,
      {
        method: 'GET',
        headers: {
          'Api-Key': 'service.406fb49d15be4a65bf05a950e7ef5baa',
        },
      }
    )
    const data = await response.json()
    if (response.status === 200 && data.items) {
      const converted: SearchAddress[] = data.items.map((item: any) => ({
        title: item.title,
        x: item.location.x,
        y: item.location.y,
      }))
      setAddresses(converted)
    }
  } catch (error) {
    console.error('Error fetching addresses:', error)
  }
}

export const UpdateAddress = async (
  setIsLoading: (arg: boolean) => void,
  houseNumber: number,
  houseUnit: number,
  address: string
) => {
  setIsLoading(true)

  try {
    const response = await fetch('/api/Auth/Register/UpdateAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authType: 'C%L&i*c(h&a*k^a&d%d^r@i#R',
        houseNumber,
        houseUnit,
        address,
      }),
    })
    await response.json()
    if (response.status === 200) {
      const randomString = [...Array(33)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('')
      setIsLoading(false)
      randomString &&
        localStorage.setItem(
          's(T*a&r)i^o*m#a#b%a*l(F)a)z)l%aBi',
          JSON.stringify(randomString)
        )
      return toast.success('کد برای شماره ارسال شد')
    } else {
      setIsLoading(false)
      localStorage.removeItem('s(T*a&r)i^o*m#a#b%a*l(F)a)z)l%aBi')
      location.reload()
      return toast.error('لطفا مجدد تلاش کنید')
    }
  } catch (error) {
    return {
      severity: 'error',
      summary: 'خطای سرور ، لطفا مجدد تلاش کنید',
      detail: 'ناموفق',
      life: 3000,
    }
  }
}
