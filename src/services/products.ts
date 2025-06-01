import { deleteCookieByKey } from '@/actions/cookieToken'
import {
  ProductGroupData,
  ProductsData,
  TreeChartInterface,
} from '@/interfaces'

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

     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return

    return await response.json()
  } catch (error) {
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

     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return
    return await response.json()
  } catch (error) {
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

     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export const CreateProduct = async ({
  name,
  id,
  prd_chart_id,
  accessToken,
}: {
  name: string
  id: number
  prd_chart_id: number
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
          group_id: id,
          ini_code: '',
          ini_name: name,
          cui: 0,
          nw: 0,
          vra: 0,
          prd_chart_id,
        }),
      }
    )

     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
export const EditProduct = async ({
  name,
  id,
  accessToken,
}: {
  name: string
  id: string
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
          sysid: 'string',
          sstid: 'string',
          sstt: 'string',
          mu: 'string',
          min_price: 0,
          max_price: 0,
          status: 0,
          prd_chart_id: 0,
          group_id: 0,
          ini_code: id,
          ini_name: name,
          cui: 0,
          nw: 0,
          vra: 0,
        }),
      }
    )

     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return
    return await response.json()
  } catch (error) {
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
    const result = await response.json()
    return result.data
  } catch (error) {
    console.log(error)
  }
}
export const GetProductSystemTypesList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<TreeChartInterface[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_sys_product_chart_list`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
  }
}
export const GetGroupSystemTypesList = async ({
  accessToken,
}: {
  accessToken: string | undefined
}): Promise<TreeChartInterface[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/.api/v1/prv_sys_visitor_chart_list`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )

     if ([401, 403].includes(response.status)) {
      await deleteCookieByKey('access_token')
      location.href = '/auth/login'
      return
    }
    if (response.status !== 200) return
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
  }
}
