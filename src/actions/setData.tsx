import { GetProductGroupsList, GetProductList } from '@/services/products'
import { getCookieByKey } from './cookieToken'
import { GetGroupsList, GetSubGroupsList } from '@/services/items'

export const getGroupData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetGroupsList({ accessToken })
  return response
}
export const getSubGroupData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetSubGroupsList({ accessToken })
  return response
}
export const getProductGroupData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetProductGroupsList({ accessToken })
  return response
}

export const getProductData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetProductList({ accessToken })
  return response
}
