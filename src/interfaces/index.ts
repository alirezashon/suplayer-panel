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
  sid: string | any
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
  supervisor_uid: string
  supervisor_id: number
  supervisor_code: string
  supervisor_name: string
  sup_status: number
  sup_type: number
  sup_group_id: number
  sup_group_name: string
}

export interface GroupData {
  sup_group_id: number
  sup_group_code: string
  sup_group_name: string
  sup_group_status: number
  supervisors_count: number
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
export interface States {
  StateCode: string
  StateDesc: string
}
export interface County {
  CountyCode: string
  CountyDesc: string
}
export interface Cities {
  CityCode: string
  CityDesc: string
  CityUID: string
}
export interface Beneficiary {
  supervisor_id: number
  visitor_type: number
  visitor_tob: number
  visitor_uid: string
  visitor_tel: string
  visitor_full_name: string
  visitor_name: string
  visitor_family: string
  visitor_status: number
  CityUID: string
  visitor_address: string
  visitor_specialty: string
  default_weight: number
  latitude: number
  longitude: number
}
export interface ProductGroup {
  id: number
  group_pid: number
  group_desc: string
  group_status: number
  level: number
}
export interface ReferrerData {
  personnel_code: string
  pers_chart_id: number
  pers_job_id: number
  pers_type: number
  pers_tob: number
  pers_uid: string
  pers_tel: string
  pers_full_name: string
  pers_name: string
  pers_family: string
  pers_status: number
  CityUID: string
  pers_address: string
}
export interface ProductGroupData {
  id: number
  group_pid: number
  group_desc: string
  group_status: number
  level: number
}
export interface ProductsData {
  sysid: string
  sys_app: string
  group: any
  sstid: string
  sstt: string
  mu: string
  mu_2nd: any
  type: any
  min_price: string
  max_price: string
  from_date: any
  from_date_pe: any
  exp_date: any
  exp_date_pe: any
  status: any
  group_id: string
  group_desc: any
  ini_code: string
  ini_name: string
  cui: string
  nw: string
  vra: string
  chart_id: string
  id: string
}
