const TaskSelectorSkeleton = () => {
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center p-2 rounded-md">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse opacity-0 group-hover:opacity-100"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSelectorSkeleton; 