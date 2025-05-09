import { z } from "zod";

export const getRequestResetPasswordFormSchema = () => {
  return z.object({
    email: z.string({ required_error: "Поле обязательно для ввода" }).email(),
  });
};
