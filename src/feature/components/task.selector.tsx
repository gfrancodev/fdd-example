import { ListTodo, Plus, Trash2 } from "lucide-react";

const TaskSelector: Task.Component.GroupSelector = ({
  groups,
  selectedGroupId,
  onSelectGroup,
  onDeleteGroup,
  onCreateGroup
}) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#323130]">Meus grupos</h2>
        <button
          className="text-[#0078d4] hover:bg-[#f3f2f1] hover:text-[#106ebe] p-2 rounded-md"
          onClick={onCreateGroup}
          aria-label="Adicionar novo grupo"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-1">
        {groups.map(group => (
          <div 
            key={group.id}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
              selectedGroupId === group.id ? 'bg-[#edebe9]' : 'hover:bg-[#f3f2f1]'
            }`}
            onClick={() => onSelectGroup(group.id)}
          >
            <div className="flex items-center gap-3">
              <ListTodo className={`h-5 w-5 ${selectedGroupId === group.id ? 'text-[#0078d4]' : 'text-[#605e5c]'}`} />
              <span className={`${selectedGroupId === group.id ? 'font-medium text-[#323130]' : 'text-[#605e5c]'}`}>
                {group.name}
              </span>
            </div>
            {groups.length > 1 && (
              <button
                className="opacity-0 hover:opacity-100 group-hover:opacity-100 text-[#605e5c] hover:text-[#d83b01]"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteGroup(group.id);
                }}
                aria-label="Excluir grupo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSelector; 