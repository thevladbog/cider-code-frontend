import { z } from "zod";

export const getRegisterSchema = () => {
  return z
    .object({
      firstName: z.string({ required_error: "Поле обязательно для ввода" }),
      lastName: z.string({ required_error: "Поле обязательно для ввода" }),
      email: z.string({ required_error: "Поле обязательно для ввода" }).email(),
      password: z
        .string({ required_error: "Поле обязательно для ввода" })
        .min(8, "Пароль должен быть не короче 8 символов"),
      confirmPassword: z
        .string({ required_error: "Поле обязательно для ввода" })
        .min(8, "Пароль должен быть не короче 8 символов"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    });
};
