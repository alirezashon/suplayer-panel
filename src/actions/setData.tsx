import { GetProductGroupsList, GetProductList } from '@/services/products'
import { getCookieByKey } from './cookieToken'
import {
  GetBeneficiaryList,
  GetGroupsList,
  GetSubGroupsList,
} from '@/services/items'
import { GetCurrentUser } from '@/services/user'
import { GetReferrerList } from '@/services/referrer'

export const getGroupData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetGroupsList({ accessToken })
  return response || []
}
export const getSubGroupData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetSubGroupsList({ accessToken })
}
export const getProductGroupData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const response = await GetProductGroupsList({ accessToken })
  if (Array.isArray(response)) {
    const productGroups = response?.filter((res) => res.group_pid === 0)
    const brands = response?.filter((res) => res.group_pid !== 0)
    return { brands, productGroups }
  }
}
export const getProductData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetProductList({ accessToken })
}
export const getBeneficiaryData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetBeneficiaryList({ accessToken })
}
export const getReferrerData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetReferrerList({ accessToken })
}
export const getUserInfo = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetCurrentUser({ accessToken })
}
