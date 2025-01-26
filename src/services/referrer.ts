import { ReferrerChartData, ReferrerData } from '@/interfaces'

export const CreateReferrer = async ({
  accessToken,
  personnel_code,
  pers_chart_id,
  pers_job_id,
  pers_type,
  pers_tob,
  pers_uid,
  pers_tel,
  pers_full_name,
  pers_name,
  pers_family,
  pers_status,
  CityUID,
  pers_address,
}: {
  accessToken: string | undefined
  personnel_code: string
  pers_chart_id: number
  pers_job_id: number
  pers_type: number
  pers_tob: number
  pers_uid: string
  pers_tel: string
  pers_full_name: string
  pers_name: string
  pers_family: string
  pers_status: number
  CityUID: string
  pers_address: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_personnel`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          personnel_code,
          pers_chart_id: 0,
          pers_job_id: 0,
          pers_type: 0,
          pers_tob: 0,
          pers_uid,
          pers_tel,
          pers_full_name,
          pers_name,
          pers_family,
          pers_status: 0,
          CityUID,
          pers_address,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditReferrer = async ({
  name,
  family,
  fullName,
  mobile,
  accessToken,
  CityUID,
  address,
  expertise,
  weight,
  lat,
  long,
  status,
}: {
  name: string
  family: string
  fullName: string
  mobile: string
  accessToken: string | undefined
  CityUID: string
  address: string
  expertise: string
  weight: number
  lat: number
  long: number
  status?: number
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_personnel`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          supervisor_id: 0,
          visitor_type: 1,
          visitor_uid: mobile,
          visitor_full_name: fullName,
          visitor_name: name,
          visitor_family: family,
          visitor_status: status,
          visitor_tob: 0,
          visitor_tel: mobile,
          CityUID,
          visitor_address: address,
          visitor_specialty: expertise,
          default_weight: weight,
          latitude: lat,
          longitude: long,
        }),
      }
    )
    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetReferrerList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<ReferrerData[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_personnel_list`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok || response.status === 500) {
      throw new Error('Failed to GetAssistantList')
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export const CreateReferrerChart = async ({
  accessToken,
  chpid,
  chtitle,
  chstatus = 0,
}: {
  accessToken: string | undefined
  chpid?: number
  chtitle: string
  chstatus?: number
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/def_Personnel_chart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          chpid,
          chtitle,
          chstatus,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditReferrerChart = async ({
  accessToken,
  chpid,
  chtitle,
  chstatus = 0,
}: {
  chpid: number
  chtitle: string
  chstatus?: number
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_Personnel_chart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          chpid,
          chtitle,
          chstatus,
        }),
      }
    )
    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetReferrerChartList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<ReferrerChartData[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_personnel_chart_list`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok || response.status === 500) {
      throw new Error('Failed to GetAssistantList')
    }

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
