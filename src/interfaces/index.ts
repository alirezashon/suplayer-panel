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
export interface IUserResponse {
  customer_status: string
  mobile: string
  first_name: string
  last_name: string
  full_name: string
  customer_code: string
  role: string
  approve_status: number
  uid: number
  user_approve: number
  customer_approve: number
  user_status: string
  user_role_id: number
  role_count: number
}
export interface IShabaDestinationList {
  sid: string
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
  visitor_count: number
  assignment_amount: number
  withdrawable_amount: number
  campaign_count: number
  personnel_count: number
}

export interface GroupData {
  sup_group_id: number
  sup_group_code: string
  sup_group_name: string
  sup_group_status: number
  supervisors_count: number
  visors_count: number
}
export interface PromotionInterface {
  cstatus: number
  ctitle: string
  start_date: string
  exp_date: string
  cta_link: string
  distype: number
  file_uid: string
  desc: string
  sgroup_id: number
  supervisor_id: number
  pgroup_id: number
  chart_id: number
  product_uid: string
}
export interface CampaignInterface {
  sgroup_id: number
  campaign_id?: number
  cstatus: number
  ctitle: string
  ctype: number
  start_date: string
  exp_date: string
  budget: number
  expected_response: number
  expected_amount: number
  desc: string
  hdr_uid: string
  syschart_id: number
  pdetails: [
    {
      pgroup_id: number
      chart_id: number
      product_uid: string
    }
  ]
  sdetails: [
    {
      sgroup_id: number
      supervisor_id: number
    }
  ]
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
export interface BeneficiaryData {
  supervisor_id: number
  visitor_type: number
  visitor_tob: number
  visitor_uid: string
  visitor_tel: string
  visitor_full_name: string
  visitor_name: string
  visitore_code?: string
  visitor_family: string
  visitor_status: number
  CityUID: string
  visitor_address: string
  visitor_specialty: number
  default_weight: number
  latitude: number
  longitude: number
  visitor_id: number
  visitor_code: string
  CityCode: string
  CityDesc: string
  CountyCode: string
  CountyDesc: string
  StateCode: string
  StateDesc: string
  collectible_credit: number
  Uncollectible_credit: number
}

export interface ReferrerData {
  personnel_code: string
  pers_chart_id: number
  pers_chart_title: string
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
  cust_id: number
  manager_id: number
  personnel_uid: string
  last_educational_degree_id: number
  last_educational_degree_title: number
  last_educational_major_id: number
  last_educational_major_title: number
  marital_status_id: number
  sex_id: number
  CityCode: string
  CityDesc: string
  CountyCode: string
  CountyDesc: string
  StateCode: string
  StateDesc: string
}
export interface TreeChartInterface {
  id: number
  chpid: number
  chtitle: string
  chstatus: number
  chlevel: number
  lev1_count: number
  chlabel?: string | null
}
export interface ProductGroupData {
  id: number
  group_pid: number
  group_desc: string
  group_status: number
  level: number
  lev1_count: number
  product_count: number
  personnel_count: number
  visitor_count: number
}
export interface ProductsData {
  sysid: string
  sys_app: string
  group: string
  sstid: string
  sstt: string
  mu: string
  mu_2nd: string
  type: string
  min_price: string
  max_price: string
  from_date: string
  from_date_pe: string
  exp_date: string
  exp_date_pe: string
  status: string
  group_id: string
  group_desc: string
  ini_code: string
  ini_name: string
  cui: string
  nw: string
  vra: string
  chart_id: string
  id: string
}
export interface DraftsData {
  cheque_type: 1
  amount: string
  cheque_number: string
  cheque_date: string
  cheque_id_file: string
  sayad_number: string
  cheque_bank: string
  cheque_branch: string
  shaba_number: string
  description: string
  cheque_uid: string
  cheque_status: number
  cheque_status_date: string
  status_description: string
}
export interface Major {
  id: number
  title: string
}
export interface EducationalDegree {
  id: number
  title: string
}
export interface FormulaData {
  formula_uid: string
  formula_title: string
  formula_desc: string
  formula_str: string
  formula_status: number
  start_date: string
  due_date: string
}
export interface KPIData {
  id: number
  task_kpi_uid: string
  kpi_code: string
  kpi_title: string
  kpi_type: number
  kpi_time_series: number
  desc: string
  cstatus: number
}
export interface IAccountBalanceResponse {
  manager_uid: string
  amount: string
  deposit: string
  withdrawal: string
}
export interface TransactionInterface {
  pan_name: string
  pan: string
  pan_id: number
  amount: number
  description: string
  transactionDate_pe: string
  transactionTime: string
  settlementDate_pe: string
  settlementTime: string
  status: number
  status_desc: string
  transaction_code: string
  transactionType: string
  transaction_cost: number
  wage_cost: number
  ttype: string | number
  CHID: string
  ref_id: string | number
  Debit: number
  Credit: number
  auto_code_id: number
}
export interface WalletDetail {
  user_uid: string
  Releasable: number
  Credit: number
  Debit: number
  SumCredit: number
  SumDebit: number
}
export interface DefineAllocationInterface {
  commission_type: number
  allocation_type: number
  source_type: number
  sup_group_code: string
  supervisor_code: string
  visitor_uid: string
  amount: number
  currency_type: number
  Signature: string
}
export interface AllocationListInterface {
  commission_type: number
  allocation_type: number
  source_type: number
  sup_group_code: string
  supervisor_code: string
  visitor_uid: string
  currency_type: number
  commission_allocation_uid: string
  regdate: string
  allocation_status_id_file: string
  wstatus: number
}
interface BaseAllocatedReleasedInterface {
  serial_uid: string
  commission_type: number
  allocation_type: number
  source_type: number
  sup_group_code: string
  sup_group_name: string
  supervisor_code: string
  supervisor_name: string
  visitor_uid: string
  visitor_full_name: string
  amount: number
  currency_type: number
  allocation_status_id_file: string
  wstatus: number
  source_uid: string
  regdate_pe: string
  reg_time: string
}

export interface AllocatedListInterface extends BaseAllocatedReleasedInterface {
  commission_allocation_uid: string
  allocated_amount: number
  released_amount: number
  remain_amount: number
  id: number
}
export interface ReleasedListInterface extends BaseAllocatedReleasedInterface {
  commission_release_uid: string
  amount: number
}

export interface SaveAllocatedDataInterface {
  commission_allocation_uid: string
  status: number
  wamount: number
  allocation_status_id_file: string
  assignment_otp: string
  Signature: string
}
export interface ShowSystemTypeUI {
  id: number | string
  label: string
  children: { id: number | string; label: string }[]
}

export interface OptionTrees {
  id: string
  label: string
  children?: OptionTrees[]
}
export interface AppointmentTaskInterface {
  id: number
  task_uid: string
  personnel_uid: string
  pers_full_name: string
  supervisor_code: string
  supervisor_name: string
  sup_group_code: string
  sup_group_name: string
  visitor_uid: string
  visitor_full_name: string
  task_kpi_uid: string
  cstatus: number
  product_uid: string
  ini_code: string
  ini_name: string
  pgroup_id: string
  group_desc: string
  chart_id: string
  chtitle: string
}
export interface ReleaseAllocatedInterface {
  ref_allocation_uid: string
  commission_type: number
  allocation_type: number
  source_type: number
  sup_group_code: string
  supervisor_code: string
  visitor_uid: string
  amount: number
  currency_type: number
  Signature: string
}
export interface ChangeReleasedStatus {
  commission_allocation_uid: string
  status: number
  wamount: number
  allocation_status_id_file: string
  assignment_otp: string
  Signature: string
}
export interface IDepositForm {
  mobile: string
  cust_name: string
  amount: number
  order_id: string
  description?: string
  ref_order_id?: string
}
export interface FinalReleaseInterface {
  commission_allocation_uid: string
  status: number
  wamount: number
  allocation_status_id_file: string
  assignment_otp: string
  Signature: string
}
