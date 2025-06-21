import { z } from "zod";

export const getCreateShiftSchema = () => {
  return z.object({
    plannedDate: z
      .string({ required_error: "Поле обязательно для ввода" })
      .min(1, "Дата обязательна для ввода"),
    productId: z
      .string({ required_error: "Поле обязательно для ввода" })
      .min(1, "Продукт обязателен для выбора"),
    plannedCount: z
      .number({ required_error: "Поле обязательно для ввода" })
      .min(1, "Запланированное количество должно быть не меньше 1"),
    packing: z.boolean().default(true),
    countInBox: z
      .number()
      .min(1, "Количество в коробе должно быть не меньше 1")
      .default(1),
  });
};
