import { useInjectComponent } from "@brushy/di";
import { BUTTON } from "../index";

const CreateGroupButton: React.FC<Core.Component.CreateGroupButtonProps> = ({ onClick }) => {
  const Button = useInjectComponent<Core.Component.ButtonProps>(BUTTON);
  
  return (
    <Button 
      className="bg-(--task-primary) hover:bg-(--task-primary-hover) text-white transition-colors px-4 py-2 rounded-md"
      onClick={onClick}
    >
      Criar meu primeiro grupo
    </Button>
  );
};

export default CreateGroupButton; 