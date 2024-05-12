import React, { useCallback } from "react";
import { toast } from "react-toastify";

export const useToastNotification = () => {
  const toastSuccess = useCallback((text = "Успіх") => {
    toast.success(text, {
      autoClose: 2000,
      draggable: true,
      position: "bottom-right",
      closeOnClick: true,
    });
  }, []);
  const toastError = useCallback((text = "Щось пішло не так") => {
    toast.error(text, {
      autoClose: 2000,
      draggable: true,
      position: "bottom-right",
      closeOnClick: true,
    });
  }, []);

  return { toastSuccess, toastError };
};
