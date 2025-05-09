import { z } from "zod";
import { PasswordInput, TextInput } from "@gravity-ui/uikit";

export const getResetPasswordFormSchema = () => {
  return z
    .object({
      password: z
        .string({ required_error: "Поле обязательно для ввода" })
        .min(8, "Пароль должен быть не короче 8 символов")
        .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
        .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
        .regex(
          /[^A-Za-z0-9]/,
          "Пароль должен содержать хотя бы один специальный символ",
        ),
      confirmPassword: z
        .string({ required_error: "Поле обязательно для ввода" })
        .min(8, "Пароль должен быть не короче 8 символов"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    });
};

interface IResetPasswordFormFields {
  name: "password" | "confirmPassword";
  label: string;
  placeholder: string;
  Component: typeof TextInput | typeof PasswordInput;
}

export const resetPasswordFormFields: IResetPasswordFormFields[] = [
  {
    name: "password",
    label: "Пароль:",
    placeholder: "Введите пароль",
    Component: PasswordInput,
  },
  {
    name: "confirmPassword",
    label: "Подтвердите пароль:",
    placeholder: "Введите пароль повторно",
    Component: PasswordInput,
  },
];
