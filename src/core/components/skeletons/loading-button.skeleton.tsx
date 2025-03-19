import { useInjectComponent } from "@brushy/di";
import { LOADING_PLACEHOLDER } from "@/core";

const LoadingButtonSkeleton = () => {
  const LoadingPlaceholder = useInjectComponent<Core.Component.LoadingPlaceholderProps>(LOADING_PLACEHOLDER);
  
  return <LoadingPlaceholder className="h-9 w-24" />;
};

export default LoadingButtonSkeleton;