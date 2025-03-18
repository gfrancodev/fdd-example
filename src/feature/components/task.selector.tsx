import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const TaskSelector: Task.Component.GroupSelector = ({
  groups,
  selectedGroupId,
  onSelectGroup,
  onDeleteGroup,
  onCreateGroup
}) => {
  const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null);
  const [deletingGroupId, setDeletingGroupId] = useState<string | null>(null);
  
  const handleDelete = (id: string) => {
    setDeletingGroupId(id);
    // Pequeno atraso para mostrar a animação antes de remover
    setTimeout(() => {
      onDeleteGroup(id);
      setDeletingGroupId(null);
    }, 200);
  };
  
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[#323130]">Meus grupos</h2>
        <button 
          onClick={onCreateGroup}
          className="h-8 w-8 rounded-md flex items-center justify-center text-[#0078d4] hover:bg-[#f3f2f1] transition-colors duration-300"
          aria-label="Criar novo grupo"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-1">
        {groups.length === 0 ? (
          <div className="text-[#605e5c] text-sm p-2">
            Nenhum grupo criado ainda.
          </div>
        ) : (
          groups.map((group) => (
            <div 
              key={group.id}
              style={{ height: "36px" }}
              className={`flex justify-between items-center px-2 py-1 rounded-md cursor-pointer group
              ${selectedGroupId === group.id ? 'bg-[#f0f8ff] text-[#0078d4]' : 'hover:bg-[#f3f2f1]'}
              ${deletingGroupId === group.id ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}
              transition-all duration-300 ease-in-out`}
              onClick={() => onSelectGroup(group.id)}
              onMouseEnter={() => setHoveredGroupId(group.id)}
              onMouseLeave={() => setHoveredGroupId(null)}
            >
              <div className="flex items-center gap-2 flex-grow overflow-hidden">
                <div 
                  className={`h-3 w-3 rounded-full flex-shrink-0 transition-colors duration-300 ${
                    selectedGroupId === group.id ? 'bg-[#0078d4]' : 'bg-[#8a8886]'
                  }`}
                />
                <span className={`truncate transition-colors duration-300 ${selectedGroupId === group.id ? 'font-medium' : ''}`}>
                  {group.name}
                </span>
                <span className="text-xs text-[#605e5c] ml-1 flex-shrink-0 transition-opacity duration-300">
                  ({group.tasks.length})
                </span>
              </div>
              <div
                className="w-8 h-8 flex items-center justify-center"
              >
                {hoveredGroupId === group.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(group.id);
                    }}
                    className="h-8 w-8 rounded-md flex items-center justify-center text-[#a19f9d] 
                    hover:text-[#d13438] hover:bg-[#fdeff0] transition-all duration-300"
                    aria-label="Excluir grupo"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskSelector; 