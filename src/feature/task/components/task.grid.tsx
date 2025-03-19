const TaskGrid: React.FC<Core.Component.TaskGridProps> = ({ sidebarContent, mainContent }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-6">
            <div className="bg-(--task-background) rounded-xl shadow-sm p-4 h-fit">
                {sidebarContent}
            </div>
            <div>
                {mainContent}
            </div>
        </div>
    );
};

export default TaskGrid;