export interface BeneficiaryProps {
  name: string
  iban: string
}

export interface WalletInfoProps {
  balance: string
  availableBalance: string
}

export interface RadioOptionProps {
  name: string
  iban: string
  isSelected?: boolean
  onChange?: (iban: string) => void
}
export interface IbanInterface {
  avatar: string
  username: string
  shabaNumber: string
  shabaId: string
  isDraggable?: boolean
  bankCode?: string
  bankName?: string
}
export interface IShabaDestinationList {
  sid: string | null
  sdcode: string
  sdtitle: string
  mobile: string
  shaba: string
  bank_code: string
  bank_name: string
  bid_code: string
  fullname: string
}
export interface SubGroup {
  name: string
}

export interface GroupData {
  title: string
  subGroups: SubGroup[]
  referrers?: number
}
export interface PromotionInterface {
  promotionDate: string // تاریخ پروموشن
  startDate: string // تاریخ شروع پروموشن
  endDate: string // تاریخ پایان پروموشن
  selectedPharmacy: string // داروخانه انتخاب شده
  selectedDoctorGroup: string // گروه پزشکان انتخاب شده
  ctaLink: string // لینک CTA
  brandSlogan: string // شعار یا جمله برند
  promotionImage: string // لینک عکس پروموشن
  discountType: 'cash' | 'product' // نوع تخفیف
  status: string
  viewCount: string
  clickedCount: string
}
export interface CampaignInterface {
  type: string // نوع کمپین
  name: string // نام کمپین
  smsType: string // نوع پیامک
  productCampaign: string // نوع کمپین محصول
  startDate: string // تاریخ شروع
  endDate: string // تاریخ پایان
  country: string // کشور
  province: string // استان
  city: string // شهر
  county: string // شهرستان
  budget: string // بودجه
  expectedResponse: string // پاسخ مورد انتظار
  description: string // شرح کمپین
  status: string // وضعیت کمپین
  selectedGroups: string[] // گروه‌ و زیرگروه‌های انتخاب شده
  joinedBrands: string[] // گروه و برند محصول عضو شده
  category: string // گروه محصول
}

export interface CardProps {
  title: string
  allocation: string
  lastAllocation: string
  released: string
}