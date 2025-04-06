import { z } from "zod";
import { PRODUCT_STATUSES_ENUM } from "@/lib/types";

export const getCreateeProductSchema = () => {
  return z.object({
    fullName: z
      .string({ required_error: "Поле обязательно для ввода" })
      .min(3, "Название должно быть не короче 3 символов")
      .startsWith("Сидр", "Название должно начинаться со слова 'Сидр'"),
    shortName: z
      .string({ required_error: "Поле обязательно для ввода" })
      .min(3, "Название должно быть не короче 3 символов"),
    volume: z
      .number({ required_error: "Поле обязательно для ввода" })
      .min(0.01, "Объем должен быть не меньше 0.01")
      .max(1000, "Объем должен быть не больше 1000"),
    gtin: z
      .string({ required_error: "Поле обязательно для ввода" })
      .length(14, "GTIN должен быть 14 символов")
      .startsWith("0", "GTIN должен начинаться с 0"),
    expirationInDays: z
      .number({ required_error: "Поле обязательно для ввода" })
      .min(1, "Срок годности должен быть не меньше 1"),
    pictureUrl: z.string().url({ message: "Некорректный URL" }),
    status: z.enum(PRODUCT_STATUSES_ENUM, {
      required_error: "Поле обязательно для ввода",
    }),
  });
};
