import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

declare global {
  namespace Core {
    namespace Toast {
      interface Props {
        title: string;
        description?: string;
        status?: "success" | "info" | "warning" | "error";
        duration?: number;
        icon?: React.ReactNode;
        isClosable?: boolean;
      }

      interface Hook {
        notify: (props: Props) => void;
      }
    }

    namespace Component {
      type Button = React.ComponentType<
        ButtonHTMLAttributes<HTMLButtonElement>
      > & {
        children: React.ReactNode;
      };

      type Input = React.ComponentType<InputHTMLAttributes<HTMLInputElement>>;
    }
  }
}

export {};
