import { z } from "zod";

export const getLoginSchema = () => {
  return z.object({
    email: z.string({ required_error: "Поле обязательно для ввода" }).email(),
    password: z
      .string({ required_error: "Поле обязательно для ввода" })
      .min(8, "Пароль должен быть не короче 8 символов"),
  });
};
