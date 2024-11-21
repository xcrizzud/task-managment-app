import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskSortProps {
  sortBy: 'priority' | 'dueDate'
  setSortBy: (sort: 'priority' | 'dueDate') => void
}

export function TaskSort({ sortBy, setSortBy }: TaskSortProps) {
  return (
    <Select value={sortBy} onValueChange={(value: 'priority' | 'dueDate') => setSortBy(value)}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="priority">Priority</SelectItem>
        <SelectItem value="dueDate">Due Date</SelectItem>
      </SelectContent>
    </Select>
  )
}

