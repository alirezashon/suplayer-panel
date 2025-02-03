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
  last_educational_degree_id,
  last_educational_major_id,
  marital_status_id,
  sex_id,
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
  last_educational_degree_id: number
  last_educational_major_id: number
  marital_status_id: number
  sex_id: number
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
          last_educational_degree_id,
          last_educational_major_id,
          marital_status_id,
          sex_id,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditReferrer = async ({
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
  last_educational_degree_id,
  last_educational_major_id,
  marital_status_id,
  sex_id,
  personnel_uid,
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
  last_educational_degree_id: number
  last_educational_major_id: number
  marital_status_id: number
  sex_id: number
  personnel_uid: string
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
          last_educational_degree_id,
          last_educational_major_id,
          marital_status_id,
          sex_id,
          personnel_uid,
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
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_personnel_list?`,
      // status_id=1
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
export const DefineAppointmentTask = async ({
  accessToken,
  personnel_uid,
  supervisor_code,
  sup_group_code,
  visitor_uid,
  task_kpi_uid,
}: {
  accessToken: string | undefined
  personnel_uid: string
  supervisor_code: string
  sup_group_code: string
  visitor_uid: string
  task_kpi_uid: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_task`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          personnel_uid,
          supervisor_code,
          sup_group_code,
          visitor_uid,
          task_kpi_uid,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditAppointmentTask = async ({
  accessToken,
  personnel_uid,
  supervisor_code,
  sup_group_code,
  visitor_uid,
  task_kpi_uid,
}: {
  accessToken: string | undefined
  personnel_uid: string
  supervisor_code: string
  sup_group_code: string
  visitor_uid: string
  task_kpi_uid: string
  task_uid: string
  status: number
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_task`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          personnel_uid,
          supervisor_code,
          sup_group_code,
          visitor_uid,
          task_kpi_uid,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const CreateReferrerChart = async ({
  accessToken,
  chpid,
  chtitle,
  chstatus = 0,
  chlabel,
}: {
  accessToken: string | undefined
  chpid?: number
  chtitle: string
  chstatus?: number
  chlabel?: string
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
          chlabel,
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
  chid = 0,
  chpid,
  chtitle,
  chstatus = 0,
  chlabel,
}: {
  chid: number
  chpid: number
  chtitle: string
  chstatus?: number
  chlabel?: string
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
          chid,
          chpid,
          chtitle,
          chstatus,
          chlabel,
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
