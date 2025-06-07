import { AppointmentTaskInterface } from "@/interfaces"
import { bgColors, deleteTask, textColors } from "../lib"
import { CloseCircle } from "iconsax-react"

type TaskWithLabel = AppointmentTaskInterface & {
  __label: string
}

const Showtasks = ({
  task,
  type,
}: {
  task: AppointmentTaskInterface[]
  type: number
}) => {
  return (
    <div className='flex flex-wrap gap-3'>
      {(() => {
        const uniqueTasksMap = new Map<string, TaskWithLabel>()

        task.forEach((t) => {
          if (type === 1) {
            if (!uniqueTasksMap.has("group-" + t.sup_group_name)) {
              uniqueTasksMap.set("group-" + t.sup_group_name, {
                ...t,
                __label: t.sup_group_name,
              })
            }
            if (!uniqueTasksMap.has("supervisor-" + t.supervisor_name)) {
              uniqueTasksMap.set("supervisor-" + t.supervisor_name, {
                ...t,
                __label: t.supervisor_name,
              })
            }
          } else if (type === 2) {
            if (!uniqueTasksMap.has("pgroup-" + t.pgroup_id)) {
              uniqueTasksMap.set("pgroup-" + t.pgroup_id, {
                ...t,
                __label: t.group_desc,
              })
            }
            if (!uniqueTasksMap.has("product-" + t.product_uid)) {
              uniqueTasksMap.set("product-" + t.product_uid, {
                ...t,
                __label: t.pgroup_id,
              })
            }
          } else if (type === 3) {
            if (!uniqueTasksMap.has("sup_group_name" + t.sup_group_name)) {
              uniqueTasksMap.set("sup_group_name" + t.sup_group_name, {
                ...t,
                __label: t.sup_group_name,
              })
            }
          } else if (type === 4) {
            if (!uniqueTasksMap.has("pgroup-" + t.pgroup_id)) {
              uniqueTasksMap.set("pgroup-" + t.pgroup_id, {
                ...t,
                __label: t.group_desc,
              })
            }
          } else if (type === 5) {
            if (!uniqueTasksMap.has("pgroup-" + t.pgroup_id)) {
              uniqueTasksMap.set("pgroup-" + t.pgroup_id, {
                ...t,
                __label: t.group_desc,
              })
            }
          } else if (type === 6) {
            if (!uniqueTasksMap.has("ini_name" + t.ini_name)) {
              uniqueTasksMap.set("ini_name" + t.ini_name, {
                ...t,
                __label: t.ini_name,
              })
            }
          }
        })

        const uniqueTasks = Array.from(uniqueTasksMap.values())
        console.log(uniqueTasksMap)
        return (
          <div className='flex flex-wrap gap-3'>
            {uniqueTasks.map((task, index) => {
              const randomIndex = Math.floor(Math.random() * 10)
              return (
                <p
                  key={index}
                  className='flex items-center gap-2 text-nowrap py-1 px-2 rounded-full'
                  style={{
                    backgroundColor: bgColors[randomIndex],
                    color: textColors[randomIndex],
                  }}
                >
                  {task.__label?.length && task.__label}
                  <CloseCircle
                    onClick={() => deleteTask(task)}
                    size={20}
                    color='#fc1c03'
                    className='cursor-pointer'
                  />
                </p>
              )
            })}
          </div>
        )
      })()}
    </div>
  )
}

export default Showtasks
