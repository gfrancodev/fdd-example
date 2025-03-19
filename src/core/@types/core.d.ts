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
      type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
        React.JSX.IntrinsicAttributes;
      type Button = React.ComponentType<ButtonProps>;

      interface InputProps
        extends InputHTMLAttributes<HTMLInputElement>,
          React.JSX.IntrinsicAttributes {
        label?: string;
        error?: string;
      }

      type Input = React.ComponentType<InputProps>;

      type HeaderProps = {
        title: string;
        rightContent?: React.ReactNode;
      } & React.JSX.IntrinsicAttributes;

      type Header = React.ComponentType<HeaderProps>;

      type LayoutProps = {
        children: React.ReactNode;
      } & React.JSX.IntrinsicAttributes;

      type Layout = React.ComponentType<LayoutProps>;

      type EmptyStateProps = {
        message: string;
        action?: React.ReactNode;
      } & React.JSX.IntrinsicAttributes;

      type EmptyState = React.ComponentType<EmptyStateProps>;

      type TaskGridProps = {
        sidebarContent: React.ReactNode;
        mainContent: React.ReactNode;
      } & React.JSX.IntrinsicAttributes;

      type TaskGrid = React.ComponentType<TaskGridProps>;

      type HelpButtonProps = {
        onClick: () => void;
      } & React.JSX.IntrinsicAttributes;

      type HelpButton = React.ComponentType<HelpButtonProps>;

      type CreateGroupButtonProps = {
        onClick: () => void;
      } & React.JSX.IntrinsicAttributes;

      type CreateGroupButton = React.ComponentType<CreateGroupButtonProps>;

      type LoadingPlaceholderProps = {
        className?: string;
      } & React.JSX.IntrinsicAttributes;

      type LoadingPlaceholder = React.ComponentType<LoadingPlaceholderProps>;

      type LoadingEffectProps = {
        children: React.ReactNode;
      } & React.JSX.IntrinsicAttributes;

      type LoadingEffect = React.ComponentType<LoadingEffectProps>;

      type LoadingButtonSkeletonProps = {} & React.JSX.IntrinsicAttributes;

      type LoadingButtonSkeleton =
        React.ComponentType<LoadingButtonSkeletonProps>;
    }
  }
}

export {};
