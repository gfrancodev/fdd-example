const TaskListSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
      <div className="border-b border-[#edebe9] py-4 px-6">
        <div className="flex flex-col gap-2">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-full">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-1 bg-[#edebe9] rounded-full w-full">
              <div className="h-1 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-0">
        <div className="p-4 border-b border-[#edebe9]">
          <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto py-2 px-4">
          <div className="space-y-1 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-2 group">
                <div className="flex items-center gap-3 w-full">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          
          <div>
            <div className="text-sm font-medium text-[#605e5c] mt-4 mb-2 px-3 flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-1">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-2 group bg-[#f3f2f1]">
                  <div className="flex items-center gap-3 w-full">
                    <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListSkeleton; 