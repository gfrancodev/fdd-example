import { Sun } from "lucide-react";
import TaskSelectorSkeleton from "@/feature/components/skeletons/task-selector-skeleton";
import TaskListSkeleton from "@/feature/components/skeletons/task-list-skeleton";

export default function TaskLoading() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-start justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sun className="h-6 w-6 text-[#0078d4]" />
            <h1 className="text-2xl font-bold text-[#323130]">Minhas Tarefas</h1>
          </div>
          <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-6">
          <div className="bg-white rounded-xl shadow-sm p-4 h-fit">
            <TaskSelectorSkeleton />
          </div>
          
          <div>
            <TaskListSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
