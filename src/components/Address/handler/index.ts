export interface SearchAddress {
  title: string
  x: number
  y: number
}
interface AddressItem {
  title: string
  address: string
  category: string
  type: string
  region: string
  location: {
    x: number
    y: number
    z: string
  }
}

export const searchAddress = async (
  value: string,
  setAddresses: (value: SearchAddress[]) => void
) => {
  try {
    const response = await fetch(
      `https://api.neshan.org/v1/search?term=${value}&lat=35.69&lng=51.3`,
      {
        method: 'GET',
        headers: {
          'Api-Key': 'service.406fb49d15be4a65bf05a950e7ef5baa',
        },
      }
    )
    const data = await response.json()
    if (response.status === 200 && data.items) {
      const converted: SearchAddress[] = data.items.map(
        (item: AddressItem) => ({
          title: item.title,
          x: item.location.x,
          y: item.location.y,
        })
      )
      setAddresses(converted)
    }
  } catch (error) {
    console.error('Error fetching addresses:', error)
  }
}
