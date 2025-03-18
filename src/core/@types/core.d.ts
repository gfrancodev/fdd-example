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
        ButtonHTMLAttributes<HTMLButtonElement> & React.JSX.IntrinsicAttributes 
      >;

      interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
        label?: string;
        error?: string;
      }
      

      type Input = React.ComponentType<InputProps> & React.JSX.IntrinsicAttributes;
    }
  }
}

export {};
