import { Task } from '@/components/task-app'

interface TaskStatsProps {
  tasks: Task[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const incompleteTasks = totalTasks - completedTasks
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length

  return (
    <div className="grid grid-cols-4 gap-4 mb-6 text-center">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800">Total Tasks</h3>
        <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800">Completed</h3>
        <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800">Incomplete</h3>
        <p className="text-2xl font-bold text-yellow-600">{incompleteTasks}</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg">
        <h3 className="font-semibold text-red-800">High Priority</h3>
        <p className="text-2xl font-bold text-red-600">{highPriorityTasks}</p>
      </div>
    </div>
  )
}

