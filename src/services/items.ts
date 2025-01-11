import { Beneficiary, GroupData, ProductGroup, SubGroup } from '@/interfaces'

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

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

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

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

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
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_super_groups_list`,
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

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

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

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

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
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_supervisors_list`,
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
  tob
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
  tob:number
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

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditBeneficiary = async ({
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
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_visitor`,
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

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetBeneficiaryList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<Beneficiary[] | undefined> => {
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
export const CreateProductGroup = async ({
  name,
  accessToken,
}: {
  name: string
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_product_group`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          group_pid: 0,
          group_desc: name,
          group_status: 1,
        }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditProductGroup = async ({
  name,
  accessToken,
  status,
}: {
  name: string
  accessToken: string | undefined
  status?: number
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_product_group`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          group_pid: 0,
          group_desc: name,
          group_status: status || 1,
        }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetProductGroupList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<ProductGroup[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_product_group_list`,
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

export const CreateProduct = async ({
  name,
  accessToken,
}: {
  name: string
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_define_products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          sstid: '',
          sstt: '',
          mu: '',
          min_price: 0,
          max_price: 0,
          group_id: 0,
          ini_code: '',
          ini_name: name,
          cui: 0,
          nw: 0,
          vra: 0,
        }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const EditProduct = async ({
  name,
  accessToken,
}: {
  name: string
  accessToken: string | undefined
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/edit_product`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          group_pid: 0,
          group_desc: name,
          group_status: 1,
        }),
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to EnableAssistant!')
    }

    return await response.json()
  } catch (error: unknown) {
    console.log(error)
  }
}
export const GetProductList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<Record<string, string | number>[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_products_list`,
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
