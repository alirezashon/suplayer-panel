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
  bankName?:string
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
  referrers:number
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
  viewCount:string,
  clickedCount:string,
}
