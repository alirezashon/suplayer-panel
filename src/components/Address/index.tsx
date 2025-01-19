import { FormEvent, useState } from 'react'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Map/index'), { ssr: false })

const Add: React.FC = () => {

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





  return (
    <div className="flex flex-col items-center h-screen p-4">
      <form className="relative w-full max-w-md">
       
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
