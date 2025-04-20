import { LabelColorsType } from "@/lib/types/shift.types";
import { SelectOption } from "@gravity-ui/uikit";

export interface IProduct {
  id: string;
  fullName: string;
  shortName: string;
  gtin: string;
  volume: number;
  alcoholCode: string;
  expirationInDays: number;
  pictureUrl?: string;
  status: TProductStatus;
}

export interface IProductResponse {
  total: number;
  page: number;
  countOfPages: number;
  limit: number;
  result: IProduct[];
}

export type TProductStatus =
  | "active"
  | "inactive"
  | "paused"
  | "registration"
  | "archived";

export const PRODUCT_STATUS_MAP: Record<IProduct["status"], string> = {
  active: "Активная",
  inactive: "Неактивная",
  paused: "Временно недоступна",
  registration: "В процессе регистрации",
  archived: "Архивная",
} as const;

export const PRODUCT_STATUS_COLOR_MAP: Record<
  IProduct["status"],
  LabelColorsType
> = {
  active: "success",
  inactive: "danger",
  paused: "warning",
  registration: "info",
  archived: "unknown",
};

export const PRODUCT_STATUS_SELECT_OPTIONS: SelectOption[] = [];

export const PRODUCT_STATUSES_ENUM: [string, ...string[]] = ["active"] as const;

// eslint-disable-next-line guard-for-in
for (const product in PRODUCT_STATUS_MAP) {
  PRODUCT_STATUS_SELECT_OPTIONS.push({
    value: product,
    content: PRODUCT_STATUS_MAP[product as IProduct["status"]],
  });
  if (product !== "active") {
    PRODUCT_STATUSES_ENUM.push(product);
  }
}
