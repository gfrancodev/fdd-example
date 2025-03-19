const LoadingPlaceholder: React.FC<Core.Component.LoadingPlaceholderProps> = ({ className = "h-9 w-24" }) => {
    return (
        <div className={`${className} bg-(--task-secondary) rounded-md animate-pulse`}></div>
    );
};

export default LoadingPlaceholder;