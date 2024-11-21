"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TaskFilterProps {
  value: 'all' | 'active' | 'completed'
  onChange: (value: 'all' | 'active' | 'completed') => void
}

export function TaskFilter({ value, onChange }: TaskFilterProps) {
  return (
    <Tabs value={value} onValueChange={onChange as (value: string) => void}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">
          All Tasks
        </TabsTrigger>
        <TabsTrigger value="active">
          Active
        </TabsTrigger>
        <TabsTrigger value="completed">
          Completed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
