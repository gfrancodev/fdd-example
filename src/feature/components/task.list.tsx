import { CalendarClock, Check } from "lucide-react";
import TaskItem from "./task.item";
import TaskInput from "./task.input";

const TaskList: Task.Component.List = ({
  groupId,
  groupName,
  tasks,
  pendingTasks,
  completedTasks,
  completedCount,
  totalCount,
  progressPercentage,
  newTaskValue,
  onNewTaskChange,
  onAddTask,
  onToggleTask,
  onDeleteTask
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
      <div className="border-b border-[#edebe9] py-4 px-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl text-[#323130]">{groupName}</h2>
          {totalCount > 0 && (
            <div className="w-full">
              <div className="text-xs text-[#605e5c] mb-1">
                {completedCount} de {totalCount} concluídas
              </div>
              <div className="h-1 bg-[#edebe9] rounded-full w-full">
                <div 
                  className="h-1 bg-[#0078d4] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-0">
        <TaskInput
          value={newTaskValue}
          onChange={onNewTaskChange}
          onSubmit={onAddTask}
        />
        
        <div className="max-h-[60vh] overflow-y-auto py-2 px-4">
          {pendingTasks.length > 0 && (
            <div className="space-y-1 mb-4">
              {pendingTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={(id) => onToggleTask(groupId, id)}
                  onDelete={(id) => onDeleteTask(groupId, id)}
                />
              ))}
            </div>
          )}
          
          {completedTasks.length > 0 && (
            <div>
              <div className="text-sm font-medium text-[#605e5c] mt-4 mb-2 px-3 flex items-center gap-2">
                <Check className="h-4 w-4" />
                Concluídos ({completedTasks.length})
              </div>
              <div className="space-y-1">
                {completedTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={(id) => onToggleTask(groupId, id)}
                    onDelete={(id) => onDeleteTask(groupId, id)}
                  />
                ))}
              </div>
            </div>
          )}
          
          {tasks.length === 0 && (
            <div className="text-center py-10 text-[#605e5c]">
              <CalendarClock className="h-12 w-12 mx-auto mb-2 text-[#8a8886]" />
              <p>Nenhuma tarefa adicionada ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList; 