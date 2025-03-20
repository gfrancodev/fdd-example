import { Plus, Trash2 } from "lucide-react";
import { Show, For } from "@/core";

const TaskSelector: Task.Component.GroupSelector = ({
  groups,
  selectedGroupId,
  onSelectGroup,
  onDeleteGroup,
  onCreateGroup,
  hoveredGroupId,
  deletingGroupId,
  onGroupMouseEnter,
  onGroupMouseLeave
}) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-(--task-text-primary)">My Groups</h2>
        <button 
          onClick={onCreateGroup}
          className="h-8 w-8 rounded-md flex items-center justify-center text-(--task-primary) hover:bg-(--task-secondary) transition-colors duration-300"
          aria-label="Create new group"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="space-y-1" role="list" aria-label="Task groups">
        <Show 
          when={groups.length > 0} 
          fallback={
            <div className="text-(--task-text-secondary) text-sm p-2" role="listitem">
              No groups created yet.
            </div>
          }
        >
          <For each={groups}>
            {(group) => (
              <div 
                key={group.id}
                style={{ height: "36px" }}
                className={`flex justify-between items-center px-2 py-1 rounded-md cursor-pointer group
                ${selectedGroupId === group.id ? 'bg-(--task-primary/10) text-(--task-primary)' : 'hover:bg-(--task-secondary)'}
                ${deletingGroupId === group.id ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}
                transition-all duration-300 ease-in-out`}
                onClick={() => onSelectGroup(group.id)}
                onMouseEnter={() => onGroupMouseEnter(group.id)}
                onMouseLeave={() => onGroupMouseLeave()}
                role="listitem"
                aria-selected={selectedGroupId === group.id}
                aria-label={`${group.name} group with ${group.tasks.length} tasks`}
              >
                <div className="flex items-center gap-2 flex-grow overflow-hidden">
                  <div 
                    className={`h-3 w-3 rounded-full flex-shrink-0 transition-colors duration-300 ${
                      selectedGroupId === group.id ? 'bg-(--task-primary)' : 'bg-(--task-text-disabled)'
                    }`}
                  />
                  <span className={`truncate transition-colors duration-300 ${selectedGroupId === group.id ? 'font-medium' : ''}`}>
                    {group.name}
                  </span>
                  <span className="text-xs text-(--task-text-secondary) ml-1 flex-shrink-0 transition-opacity duration-300">
                    ({group.tasks.length})
                  </span>
                </div>
                <div
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <Show when={hoveredGroupId === group.id}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteGroup(group.id);
                      }}
                      className="h-8 w-8 rounded-md flex items-center justify-center text-(--task-text-placeholder) 
                      hover:text-(--task-error) hover:bg-(--task-error/10) transition-all duration-300 cursor-pointer"
                      aria-label={`Delete group ${group.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </Show>
                </div>
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};

export default TaskSelector; 