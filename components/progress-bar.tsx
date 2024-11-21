"use client"

import { Progress } from "@/components/ui/progress"
import { Task } from './task-app'

interface ProgressBarProps {
  tasks: Task[]
}

export function ProgressBar({ tasks }: ProgressBarProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="w-full space-y-2">
      <Progress value={progressPercentage} className="h-2" />
      <p className="text-sm text-muted-foreground text-center">
        {completedTasks} of {totalTasks} tasks completed ({progressPercentage}%)
      </p>
    </div>
  )
}
