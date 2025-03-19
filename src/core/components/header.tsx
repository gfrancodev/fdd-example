import { Sun } from "lucide-react";

const Header: React.FC<Core.Component.HeaderProps> = ({ title, rightContent }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Sun className="h-6 w-6 text-(--task-primary)" />
        <h1 className="text-2xl font-bold text-(--task-text-primary)">{title}</h1>
      </div>
      {rightContent}
    </header>
  );
};

export default Header; 