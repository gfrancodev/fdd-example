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
      type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & React.JSX.IntrinsicAttributes;
      type Button = React.ComponentType<ButtonProps>;

      interface InputProps extends InputHTMLAttributes<HTMLInputElement>, React.JSX.IntrinsicAttributes {
        label?: string;
        error?: string;
      }
      
      type Input = React.ComponentType<InputProps>;
    }
  }
}

export {};
