import {  ProductGroupData, ProductsData } from '@/interfaces'

export const CreateProductGroup = async ({
  name,
  group_pid = 0,
  accessToken,
}: {
  name: string
  group_pid?: number
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
          group_pid,
          group_desc: `${name}`,
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
  group_id = 0,
  group_pid = 0,
  accessToken,
  status,
}: {
  name: string
  group_id?: number
  group_pid?: number
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
          group_id,
          group_pid,
          group_desc: `${name}`,
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
export const GetProductGroupsList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<ProductGroupData[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_product_group_list?status_id=1`,
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
}): Promise<ProductsData[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_products_list`,
      // `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_products_list?status_id=1`,
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
