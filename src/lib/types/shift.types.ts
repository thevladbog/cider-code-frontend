export interface IShiftData {
  id: string;
  status: "planned" | "inProgress" | "paused" | "done" | "canceled";
  date: string;
  product: string;
  volume: number;
  plannedCount: number;
  packing: boolean;
  countInBox?: number;
  doneCount?: number;
  doneBoxes?: number;
}

export interface IShiftResponse {
  total: number;
  page: number;
  countOfPages: number;
  limit: number;
  result: IShiftData[];
}

export const STATUS_MAP: Record<IShiftData["status"], string> = {
  planned: "Запланирована",
  inProgress: "В работе",
  paused: "Приостановлена",
  done: "Завершена",
  canceled: "Отменена",
};

type LabelColorsType =
  | "normal"
  | "info"
  | "danger"
  | "warning"
  | "success"
  | "utility"
  | "unknown"
  | "clear"
  | undefined;

export const STATUS_COLOR_MAP: Record<IShiftData["status"], LabelColorsType> = {
  planned: "normal",
  inProgress: "info",
  paused: "warning",
  done: "success",
  canceled: "danger",
};
