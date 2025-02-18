import {
  BeneficiaryData,
  FormulaData,
  GroupData,
  KPIData,
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
  syschart_id,
}: {
  name: string
  groupID: number
  accessToken: string | undefined
  syschart_id: number
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
          syschart_id,
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
  accessToken,
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
}: {
  accessToken: string | undefined
  supervisor_id: number
  visitor_type: number
  visitor_tob: number
  visitor_uid: string
  visitor_tel: string
  visitor_full_name: string
  visitor_name: string
  visitor_family: string
  visitor_status: number
  CityUID: string
  visitor_address: string
  visitor_specialty: string
  default_weight: number
  latitude: number
  longitude: number
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
    const data = await response.json()
    return data.data
  } catch (error) {
    console.log(error)
  }
}

export const CreateFormula = async ({
  formula_uid,
  formula_title,
  formula_desc,
  formula_str,
  formula_status,
  start_date,
  due_date,
  accessToken,
}: {
  formula_uid: string
  formula_title: string
  formula_desc: string
  formula_str: string
  formula_status: number
  start_date: string
  due_date: string
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_kpi_formula`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          formula_uid,
          formula_title,
          formula_desc,
          formula_str,
          formula_status,
          start_date,
          due_date,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditFormula = async ({
  formula_uid,
  formula_title,
  formula_desc,
  formula_str,
  formula_status,
  start_date,
  due_date,
  accessToken,
}: {
  formula_uid: string
  formula_title: string
  formula_desc: string
  formula_str: string
  formula_status: number
  start_date: string
  due_date: string
  accessToken: string | undefined
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
          formula_uid,
          formula_title,
          formula_desc,
          formula_str,
          formula_status,
          start_date,
          due_date,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetFormulassList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<FormulaData[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_kpi_formula_list?status_id=1`,
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

export const CreateKPITask = async ({
  kpi_title,
  kpi_code,
  kpi_type,
  kpi_time_series,
  kpi_internal_uid,
  accessToken,
}: {
  kpi_title: string
  kpi_code: string
  kpi_type: number
  kpi_time_series: number
  kpi_internal_uid: string
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_task_kpi`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          kpi_title,
          kpi_code,
          kpi_type,
          kpi_time_series,
          kpi_internal_uid,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditKPITask = async ({
  task_kpi_uid,
  kpi_code,
  kpi_title,
  kpi_type,
  kpi_time_series,
  status,
  accessToken,
}: {
  task_kpi_uid: string
  kpi_code: string
  kpi_title: string
  kpi_type: number
  kpi_time_series: number
  status?: number
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_task_kpi`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          task_kpi_uid,
          kpi_code,
          kpi_title,
          kpi_type,
          kpi_time_series,
          status,
        }),
      }
    )

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetKPITaskList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<KPIData[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_task_kpi_list?status_id=1`,
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

    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}
