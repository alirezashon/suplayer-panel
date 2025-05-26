import { AppointmentTaskInterface } from '@/interfaces'
import { bgColors, deleteTask, textColors } from '../lib'
import { CloseCircle } from 'iconsax-react'

const Showtasks = ({ task }: { task: AppointmentTaskInterface[] }) => {
  return (
    <div className='flex flex-wrap gap-3'>
      {(() => {
        const uniqueTasks = task?.reduce<{
          groups: string[]
          supervisors: string[]
          items: typeof task
        }>(
          (acc, task) => {
            if (!acc.groups.includes(task.sup_group_name)) {
              acc.groups.push(task.sup_group_name)
              acc.items.push(task)
            }
            if (!acc.supervisors.includes(task.supervisor_name)) {
              acc.supervisors.push(task.supervisor_name)
              acc.items.push(task)
            }
            return acc
          },
          { groups: [], supervisors: [], items: [] }
        ).items

        return (
          <div className='flex flex-wrap gap-3'>
            {uniqueTasks.map((task, index) => {
              const randomIndex = Math.floor(Math.random() * 10)
              return (
                <p
                  key={index}
                  className='flex text-nowrap gap-3 py-1 px-2 rounded-full'
                  style={{
                    backgroundColor: bgColors[randomIndex],
                    color: textColors[randomIndex],
                  }}>
                  {task.sup_group_name || task.supervisor_name}
                  <CloseCircle
                    onClick={() => deleteTask(task)}
                    size={24}
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
