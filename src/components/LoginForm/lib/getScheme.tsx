import { z } from "zod";

export const getLoginSchema = () => {
  return z.object({
    email: z.string({ required_error: "Поле обязательно для ввода" }).email(),
    password: z
      .string({ required_error: "Поле обязательно для ввода" })
      .min(3, "Название должно быть не короче 3 символов"),
  });
};
