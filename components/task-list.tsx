import { Droppable } from '@hello-pangea/dnd'
import { TaskItem } from './task-item'
import { Task } from './task-app'

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (task: Task) => void
  onDeleteTask: (id: number) => void
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  return (
    <Droppable droppableId="taskList">
      {(provided) => (
        <ul 
          {...provided.droppableProps} 
          ref={provided.innerRef}
          className="space-y-2"
        >
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              onUpdate={onUpdateTask}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}

