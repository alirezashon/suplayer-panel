import { getCookieByKey } from "@/actions/cookieToken"
import { AppointmentTaskInterface } from "@/interfaces"
import { EditAppointmentTask } from "@/services/referrer"

export const bgColors:string[] = [
  '#a3d8ff', // آبی خیلی روشن
  '#f58e9d', // صورتی خیلی روشن
  '#78ff82', // سبز نعنایی ملایم
  '#facd87', // نارنجی هلویی روشن
  '#eeadf7', // یاسی خیلی روشن
  '#99fff9', // سبز آبی روشن
  '#f5ea6e', // زرد پاستلی روشن
  '#ff91b6', // صورتی کمرنگ
  '#b07ffa', // بنفش خیلی روشن
  '#f0ff66', // زرد ملایم
]

export const textColors = [
  '#1565C0', // آبی تیره
  '#D32F2F', // قرمز تیره
  '#2E7D32', // سبز تیره
  '#E65100', // نارنجی تیره
  '#8E24AA', // بنفش تیره
  '#00897B', // سبزآبی تیره
  '#F9A825', // زرد پررنگ
  '#C2185B', // صورتی تیره
  '#512DA8', // بنفش سلطنتی
  '#827717', // زیتونی تیره
]

export const deleteTask = async (data: AppointmentTaskInterface) => {
  await EditAppointmentTask({
    accessToken: await getCookieByKey('access_token'),
    personnel_uid: data.personnel_uid,
    supervisor_code: data.supervisor_code,
    sup_group_code: data.sup_group_code,
    visitor_uid: data.visitor_uid,
    task_kpi_uid: data.task_kpi_uid,
    task_uid: data.task_uid,
    status: 9,
    pgroup_id: parseInt(data.pgroup_id),
    chart_id: parseInt(data.chart_id),
    product_uid: data.product_uid,
  })
}

