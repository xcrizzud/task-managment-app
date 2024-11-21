"use client"

import { useState } from 'react'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddTask } from './add-task'
import { TaskList } from './task-list'
import { TaskStats } from './task-stats'
import { TaskFilter } from './task-filter'
import { TaskSort } from './task-sort'
import { ProgressBar } from './progress-bar'
import { ThemeToggle } from './theme-toggle'

export interface Task {
  id: number
  text: string
  completed: boolean
  category: string
  priority: 'low' | 'medium' | 'high'
  dueDate: Date | null
}

type SortOption = 'priority' | 'dueDate'
type FilterOption = 'all' | 'active' | 'completed'

export default function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('priority')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')

  const addTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now(),
      completed: false,
    }
    setTasks([...tasks, task])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newTasks = Array.from(tasks)
    const [reorderedTask] = newTasks.splice(result.source.index, 1)
    newTasks.splice(result.destination.index, 0, reorderedTask)

    setTasks(newTasks)
  }

  const categories = ['Work', 'Personal', 'Errands', 'Health']

  const filteredTasks = tasks.filter(task => {
    if (filterBy === 'active') return !task.completed
    if (filterBy === 'completed') return task.completed
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    } else if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.getTime() - b.dueDate.getTime()
    }
    return 0
  })

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 flex justify-between items-center">
        <CardTitle className="text-3xl font-bold text-center text-white">DayTask</CardTitle>
        <ThemeToggle />
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-[400px] grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
            <div className="flex space-x-2">
              <TaskFilter filterBy={filterBy} setFilterBy={setFilterBy} />
              <TaskSort sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>
          <AddTask onAddTask={addTask} categories={categories} />
          <ProgressBar tasks={tasks} />
          <TaskStats tasks={tasks} />
          <DragDropContext onDragEnd={handleDragEnd}>
            {['all', ...categories].map(category => (
              <TabsContent key={category} value={category}>
                <TaskList
                  tasks={sortedTasks.filter(task => category === 'all' || task.category === category)}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                />
              </TabsContent>
            ))}
          </DragDropContext>
        </Tabs>
      </CardContent>
    </Card>
  )
}

