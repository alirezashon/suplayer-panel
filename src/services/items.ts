import {
  BeneficiaryData,
  GroupData,
  ReferrerData,
  SubGroup,
} from '@/interfaces'

export const CreateGroup = async ({
  name,
  accessToken,
}: {
  name: string
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_groups`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          sup_group_name: `${name}`,
          sup_group_status: 1,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditGroup = async ({
  name,
  sup_group_code,
  accessToken,
  status,
}: {
  name: string
  accessToken: string | undefined
  sup_group_code: string
  status?: number
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_super_grpups`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          sup_group_code,
          sup_group_name: `${name}`,
          sup_group_status: status || 1,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetGroupsList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<GroupData[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_super_groups_list?status_id=1`,
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
export const CreateSubGroup = async ({
  name,
  accessToken,
  groupID,
}: {
  name: string
  groupID: number
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_supervisors`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          supervisor_name: name,
          sup_status: 1,
          sup_type: 2,
          supervisor_uid: '',
          sup_group_id: groupID,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditSubGroup = async ({
  name,
  code,
  accessToken,
  status,
  group_id,
}: {
  name: string
  code: string
  accessToken: string | undefined
  status?: number
  group_id: string
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_supervisor`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          supervisor_code: code,
          supervisor_name: name,
          sup_status: status || 1,
          sup_type: 2,
          supervisor_uid: '',
          sup_group_code: group_id,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetSubGroupsList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<SubGroup[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_supervisors_list?status_id=1`,
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
export const CreateBeneficiary = async ({
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
  tob,
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
  tob: number
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_visitors`,
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
          visitor_status: 1,
          visitor_tob: tob,
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
export const EditBeneficiary = async ({
  visitor_code,
  supervisor_id,
  visitor_type,
  visitor_tob,
  visitor_uid,
  visitor_tel,
  visitor_full_name,
  visitor_name,
  visitor_family,
  visitor_status,
  CityUID,
  visitor_address,
  visitor_specialty,
  default_weight,
  latitude,
  longitude,
  accessToken,
}: {
  visitor_code?: string
  supervisor_id: number
  visitor_type: number
  visitor_tob: number
  visitor_uid: string
  visitor_tel: string
  visitor_full_name: string
  visitor_name: string
  visitor_family: string
  visitor_status?: number
  CityUID: string
  visitor_address: string
  visitor_specialty: string
  default_weight: number
  latitude: number
  longitude: number
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_visitor`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          visitor_code,
          supervisor_id,
          visitor_type,
          visitor_tob,
          visitor_uid,
          visitor_tel,
          visitor_full_name,
          visitor_name,
          visitor_family,
          visitor_status,
          CityUID,
          visitor_address,
          visitor_specialty,
          default_weight,
          latitude,
          longitude,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetBeneficiaryList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<BeneficiaryData[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_visitors_list?status_id=1`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_personnel_list`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_visitors_list`,
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
