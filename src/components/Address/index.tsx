import { FormEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { ShieldSearch } from 'iconsax-react'
import { searchAddress, SearchAddress } from './handler'

const Map = dynamic(() => import('./Map/index'), { ssr: false })

const Add: React.FC = () => {
  const [foundAddresses, setFoundAddresses] = useState<SearchAddress[]>([])
  const [mapData, setMapData] = useState<[number, number]>([
    35.72249924640049, 51.335191350784214,
  ])
  const [address, setAddress] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const updateAddress = async (e: FormEvent) => {
    e.preventDefault()
    // const information = { address, lat: mapData[0], long: mapData[1] }
    // addAddress(toast, information)
  }

  const handleSearchChange = async (value: string) => {
    setSearch(value)
    if (value.length > 2) {
      await searchAddress(value, setFoundAddresses)
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const handleSelectAddress = (selected: SearchAddress) => {
    setMapData([selected.location.y, selected.location.x])
    setAddress(selected.title)
    setShowDropdown(false)
  }

  return (
    <div className="flex flex-col items-center h-screen p-4">
      <form className="relative w-full max-w-md">
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="جستجو ..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-right outline-none focus:border-red-400"
        />
        <ShieldSearch className="absolute right-3 top-2.5 text-red-300 text-2xl" />
        {showDropdown && (
          <div className="absolute w-full bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto z-10 rounded-md shadow-md">
            {foundAddresses.map((item) => (
              <div
                key={item.title}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectAddress(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </form>

      <div className="flex flex-col items-center w-full max-w-4xl mt-6">
        <div className="border border-red-200 rounded-lg w-full h-96">
          <Map coord={mapData} setCoord={setMapData} setAddress={setAddress} />
        </div>

        <form
          onSubmit={updateAddress}
          className="flex flex-col items-center w-full mt-4 space-y-4"
        >
          <textarea
            placeholder="آدرس"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-32 border border-gray-300 rounded-md p-2 text-right outline-none focus:border-red-400"
          ></textarea>
          <input
            type="submit"
            value="ثبت آدرس"
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 cursor-pointer"
          />
        </form>
      </div>
    </div>
  )
}

export default Add
