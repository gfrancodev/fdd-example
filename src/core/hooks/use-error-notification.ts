import { useCallback } from "react";
import { useInject } from "@brushy/di";
import { TOAST } from "@/core";

export const useErrorNotification = () => {
  const { notify } = useInject<Core.Toast.Hook>(TOAST);

  const handleError = useCallback((error: Error, title: string, description: string) => {
    console.error(title, error);
    notify({
      title,
      description,
      status: "error",
      isClosable: true,
    });
  }, [notify]);

  return { handleError };
};