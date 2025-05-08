import { z } from "zod";
import { PasswordInput, TextInput } from "@gravity-ui/uikit";

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

interface IRegisterFields {
  name: "firstName" | "lastName" | "email" | "password" | "confirmPassword";
  label: string;
  placeholder: string;
  Component: typeof TextInput | typeof PasswordInput;
}

export const registerFields: IRegisterFields[] = [
  {
    name: "firstName",
    label: "Имя:",
    placeholder: "Введите имя",
    Component: TextInput,
  },
  {
    name: "lastName",
    label: "Фамилия:",
    placeholder: "Введите фамилию",
    Component: TextInput,
  },

  {
    name: "email",
    label: "Email:",
    placeholder: "Введите электронную почту",
    Component: TextInput,
  },
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
