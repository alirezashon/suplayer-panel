import {
  GetGroupSystemTypesList,
  GetProductGroupsList,
  GetProductList,
  GetProductSystemTypesList,
} from '@/services/products'
import { getCookieByKey } from './cookieToken'
import {
  GetBeneficiaryList,
  GetGroupsList,
  GetKPITaskList,
  GetSubGroupsList,
} from '@/services/items'
import { GetCurrentUser } from '@/services/user'
import { GetReferrerChartList, GetReferrerList } from '@/services/referrer'
import { GetCampaignList } from '@/services/campaign'
import { GetPromotionList } from '@/services/promotion'
import {
  GetdDraftsList,
  GetTransactions,
  GetWalletDetail,
} from '@/services/finance'
import { GetAllocatedList } from '@/services/allocation'
import { TreeChartInterface } from '@/interfaces'

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
  return await GetWalletDetail({ accessToken })
}

export const getTransactionHistory = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetTransactions({ accessToken })
}

export const getAllocatedList = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  return await GetAllocatedList({ accessToken })
}

export const getSystemTypes = async () => {
  const accessToken = (await getCookieByKey('access_token')) || ''
  const productTypesResult =
    (await GetProductSystemTypesList({ accessToken })) || []
  const groupTypesResult =
    (await GetGroupSystemTypesList({ accessToken })) || []

  // تابعی برای پردازش داده‌ها و ایجاد ساختار درختی
  const processTypes = (types: TreeChartInterface[]) => {
    const acc: Record<
      number | string,
      {
        id: number | string
        label: string
        children: { id: number | string; label: string }[]
      }
    > = {}

    // ابتدا والدها را اضافه کن
    types.forEach((item) => {
      if (item.chpid === 0) {
        acc[item.id] = { id: item.id, label: item.chtitle, children: [] }
      }
    })

    // سپس فرزندان را اضافه کن
    types.forEach((item) => {
      if (item.chpid !== 0 && acc[item.chpid]) {
        acc[item.chpid].children.push({
          id: item.id,
          label: item.chtitle,
        })
      }
    })

    return Object.values(acc)
  }

  const productTypes = processTypes(productTypesResult)
  const groupTypes = processTypes(groupTypesResult)

  return { productTypes, groupTypes }
}


