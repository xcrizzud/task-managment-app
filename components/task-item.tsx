"use client"

import { Draggable } from '@hello-pangea/dnd'
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, AlertCircle, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { Task } from './task-app'

interface TaskItemProps {
  task: Task
  index: number
  onUpdate: (task: Task) => void
  onDelete: () => void
}

export function TaskItem({ task, index, onUpdate, onDelete }: TaskItemProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 dark:text-red-400'
      case 'medium':
        return 'text-yellow-500 dark:text-yellow-400'
      case 'low':
        return 'text-green-500 dark:text-green-400'
    }
  }

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="list-none"
        >
          <Card className={`${task.completed ? 'opacity-60' : ''}`}>
            <CardContent className="p-4 flex items-center gap-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={(checked) => {
                  onUpdate({ ...task, completed: checked as boolean })
                }}
              />
              <div className="flex-1">
                <p className={`${task.completed ? 'line-through' : ''} font-medium`}>
                  {task.text}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span className="bg-secondary px-2 py-0.5 rounded">
                    {task.category}
                  </span>
                  <AlertCircle className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
                  {task.dueDate && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(task.dueDate, 'MMM d')}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </li>
      )}
    </Draggable>
  )
}
