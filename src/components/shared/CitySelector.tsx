import { getCookieByKey } from '@/actions/cookieToken'
import { Cities, County, States } from '@/interfaces'
import { GetCity, GetCounty, GetStates } from '@/services/location'
import { useState, useRef, useEffect } from 'react'

const CitySelector = ({
  setResult,
}: {
  setResult: (value: string) => void
}) => {
  const [states, setStates] = useState<States[]>([])
  const [county, setCounty] = useState<County[]>([])
  const [cities, Setcities] = useState<Cities[]>([])
  const locationRefs = useRef({ state: '', county: '', city: '' })

  useEffect(() => {
    const getLocs = async () => {
      const accessToken = await getCookieByKey('access_token')
      await GetStates({ accessToken }).then(async (value) => {
        if (value) {
          setStates(value)
          await GetCounty({ accessToken, state: value[0].StateCode }).then(
            async (counties) => {
              if (counties) {
                setCounty(counties)
                await GetCity({
                  accessToken,
                  state: value[0].StateCode,
                  county: counties[0].CountyCode,
                }).then((cityList) => {
                  if (cityList) {
                    Setcities(cityList)
                  }
                })
              }
            }
          )
        }
      })
    }
    getLocs()
  }, [])

  const getCounty = async (state: string) => {
    const accessToken = await getCookieByKey('access_token')
    await GetCounty({ accessToken, state: state }).then(async (counties) => {
      if (counties) {
        setCounty(counties)
        await GetCity({
          accessToken,
          state: state,
          county: locationRefs.current.county,
        }).then((cityList) => {
          if (cityList) {
            Setcities(cityList)
          }
        })
      }
    })
  }
  const getCity = async (county: string) => {
    const accessToken = await getCookieByKey('access_token')
    await GetCity({
      accessToken,
      state: locationRefs.current.state,
      county: county,
    }).then((cityList) => {
      if (cityList) {
        Setcities(cityList)
      }
    })
  }

  return (
    <div className='w-full'>
      <div className='flex gap-4 my-3'>
        <div className='flex-1'>
          <label> استان </label>
          <select
            className='w-full border rounded-lg h-10 px-1 outline-none'
            onChange={(e) => {
              getCounty(e.target.value)
              locationRefs.current.state = e.target.value
            }}>
            {states.length > 0 &&
              states.map((item, index) => (
                <option key={index} value={item.StateCode}>
                  {item.StateDesc}
                </option>
              ))}
          </select>
        </div>
        <div className='flex-1'>
          <label> شهرستان </label>
          <select
            className='w-full border rounded-lg h-10 px-1 outline-none'
            onChange={(e) => {
              getCity(e.target.value)
              locationRefs.current.county = e.target.value
            }}>
            {county.length > 0 &&
              county.map((item, index) => (
                <option key={index} value={item.CountyCode}>
                  {item.CountyDesc}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='flex gap-4 my-3'>
        <div className='flex-1'>
          <label> شهر </label>
          <select
            className='w-full border rounded-lg h-10 px-1 outline-none'
            onChange={(e) => setResult(e.target.value)}>
            {cities.length > 0 &&
              cities.map((item, index) => (
                <option key={index} value={item.CityUID}>
                  {item.CityDesc}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default CitySelector
