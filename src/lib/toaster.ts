import { Toaster } from "@gravity-ui/uikit";

import { Sentry } from "./sentry";

// Создаем единственный экземпляр Toaster для всего приложения
export const toaster = new Toaster();

// Утилитарная функция для показа ошибки и отправки в Sentry
export const showErrorToast = (message: string, error?: Error | unknown) => {
  toaster.add({
    name: "error",
    title: "Ошибка",
    content: message,
    theme: "danger",
    autoHiding: 5000,
  });

  // Отправляем ошибку в Sentry
  if (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
    } else {
      Sentry.captureMessage(`Error: ${message}`, "error");
    }
  } else {
    Sentry.captureMessage(message, "error");
  }
};

// Утилитарная функция для показа успешного сообщения
export const showSuccessToast = (message: string) => {
  toaster.add({
    name: "success",
    title: "Успешно",
    content: message,
    theme: "success",
    autoHiding: 3000,
  });
};
