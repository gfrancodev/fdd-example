import { Info } from "lucide-react";
import { useInjectComponent } from "@brushy/di";
import { BUTTON } from "../index";

const HelpButton: React.FC<Core.Component.HelpButtonProps> = ({ onClick }) => {
  const Button = useInjectComponent<Core.Component.ButtonProps>(BUTTON);
  
  return (
    <Button
      onClick={onClick}
      className="flex items-center gap-2 bg-transparent hover:bg-(--task-secondary) px-4 py-2 rounded-md transition-colors"
      aria-label="Help"
    >
      <Info className="h-4 w-4 text-(--task-primary)" />
      <span className="text-(--task-primary)">Help</span>
    </Button>
  );
};

export default HelpButton; 