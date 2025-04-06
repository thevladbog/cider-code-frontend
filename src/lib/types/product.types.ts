import { LabelColorsType } from "@/lib/types/shift.types";

export interface IProduct {
  id: string;
  fullName: string;
  shortName: string;
  gtin: string | number;
  volume: number;
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
};

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
