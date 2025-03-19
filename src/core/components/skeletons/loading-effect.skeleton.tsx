const LoadingEffect: Core.Component.LoadingEffect = ({ children }) => {
  return (
    <div className="relative">
      {children}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-(--task-background/30) to-transparent animate-task-shimmer" 
        style={{ backgroundSize: '200% 100%' }}
      ></div>
    </div>
  );
};

export default LoadingEffect;