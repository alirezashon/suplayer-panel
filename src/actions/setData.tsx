import { GetProductGroupsList, GetProductList } from '@/services/products'
import { getCookieByKey } from './cookieToken'
import { GetBeneficiaryList, GetGroupsList, GetSubGroupsList } from '@/services/items'

export const getGroupData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetGroupsList({ accessToken })
  return response || []
}
export const getSubGroupData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetSubGroupsList({ accessToken })
  return response
}
export const getProductGroupData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetProductGroupsList({ accessToken })
  if (Array.isArray(response)) {
    const uniques = response?.filter((res) => res.group_pid === 0)
    return uniques
  }
}

export const getProductData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetProductList({ accessToken })
  return response
}
export const getBeneficiaryData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetBeneficiaryList({ accessToken })
  return response
}
export const getReferrerData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  // const response = await GetReferrerList({ accessToken })
  // return response
}