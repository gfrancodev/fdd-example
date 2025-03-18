import { toast, ToastT } from "sonner";

const useSonner = (): Core.Toast.Hook => {
  const notify = ({
    title,
    description = "",
    status = "info",
    duration = 3000,
    icon,
    isClosable = true,
  }: Core.Toast.Props) => {
    toast(title, {
      description,
      icon,
      duration,
      type: status,
      dismissible: isClosable,
    } as ToastT);
  };

  return { notify };
};

export default useSonner;
