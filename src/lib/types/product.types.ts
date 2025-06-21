import { LabelColorsType } from "@/lib/types/shift.types";
import { ButtonView, SelectOption } from "@gravity-ui/uikit";
import { CreateProductDto } from "./openapi";

export const PRODUCT_STATUS_MAP: Record<CreateProductDto.status, string> = {
  ACTIVE: "Активная",
  INACTIVE: "Неактивная",
  PAUSED: "Временно недоступна",
  REGISTRATION: "В процессе регистрации",
  ARCHIVED: "Архивная",
} as const;

export const PRODUCT_STATUS_COLOR_MAP: Record<
  CreateProductDto.status,
  LabelColorsType
> = {
  ACTIVE: "success",
  INACTIVE: "danger",
  PAUSED: "warning",
  REGISTRATION: "info",
  ARCHIVED: "unknown",
};

export const PRODUCT_STATUS_COLOR_MAP_BUTTON: Record<
  CreateProductDto.status,
  ButtonView
> = {
  ACTIVE: "outlined-success",
  INACTIVE: "outlined-danger",
  PAUSED: "outlined-warning",
  REGISTRATION: "outlined-info",
  ARCHIVED: "normal",
};

export const PRODUCT_STATUS_SELECT_OPTIONS: SelectOption[] = [];

export const PRODUCT_STATUSES_ENUM: [string, ...string[]] = ["active"] as const;

// eslint-disable-next-line guard-for-in
for (const product in PRODUCT_STATUS_MAP) {
  PRODUCT_STATUS_SELECT_OPTIONS.push({
    value: product,
    content: PRODUCT_STATUS_MAP[product as CreateProductDto.status],
  });
  if (product !== "active") {
    PRODUCT_STATUSES_ENUM.push(product);
  }
}
