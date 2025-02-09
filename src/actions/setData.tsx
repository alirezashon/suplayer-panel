import { GetProductGroupsList, GetProductList } from '@/services/products'
import { getCookieByKey } from './cookieToken'
import {
  GetBeneficiaryList,
  GetGroupsList,
  GetKPITaskList,
  GetSubGroupsList,
} from '@/services/items'
import {
  GetAccountBalance,
  GetCurrentUser,
  GetNoneRemovableBalance,
} from '@/services/user'
import { GetReferrerChartList, GetReferrerList } from '@/services/referrer'
import { GetCampaignList } from '@/services/campaign'
import { GetPromotionList } from '@/services/promotion'
import { GetdDraftsList } from '@/services/deposit'

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
export const getReferrerChart = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetReferrerChartList({ accessToken })
}
export const getCampaignData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetCampaignList({ accessToken })
}
export const getPromotiuonData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetPromotionList({ accessToken })
}
export const getDraftsData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetdDraftsList({ accessToken })
}
export const getKPITaskData = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetKPITaskList({ accessToken })
}
export const getBalance = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const accountBalance = await GetAccountBalance({ accessToken })
  const noneRemovable = await GetNoneRemovableBalance({ accessToken })

  if (accountBalance && accountBalance[0] && noneRemovable)
    return {
      allBalance: Number(accountBalance[0]?.amount) || 0,
      removable: Number(noneRemovable[0]?.amount) || 0,
    }
}
