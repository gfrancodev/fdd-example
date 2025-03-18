import { toast, ToastOptions, ToastIcon } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useReactToastify = (): Core.Toast.Hook => {
  const notify = ({
    title,
    description = "",
    status = "info",
    duration = 3000,
    icon,
    isClosable = true,
  }: Core.Toast.Props) => {
    const toastOptions: ToastOptions = {
      position: "top-right",
      autoClose: duration,
      hideProgressBar: false,
      closeButton: isClosable,
      icon: icon as ToastIcon,
      type: status,
      draggable: true,
      pauseOnHover: true,
    };
    toast(
      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>,
      toastOptions
    );
  };

  return { notify };
};

export default useReactToastify;
