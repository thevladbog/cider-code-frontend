import { IShiftResponse } from "@/lib/types";

export const SHIFTS_MOCK: IShiftResponse = {
  total: 10,
  page: 1,
  countOfPages: 2,
  limit: 5,
  result: [
    {
      id: "1",
      status: "planned",
      date: "2020-01-01",
      product: "Сухой Дикий Крест",
      volume: 0.45,
      plannedCount: 3600,
      packing: true,
    },
    {
      id: "2",
      status: "inProgress",
      date: "2020-01-02",
      product: "Сухой Дикий Крест",
      volume: 20,
      plannedCount: 36,
      packing: false,
    },
    {
      id: "3",
      status: "paused",
      date: "2020-01-03",
      product: "Восстание Против Пепина",
      volume: 0.33,
      plannedCount: 4150,
      packing: true,
      countInBox: 20,
      doneCount: 1220,
      doneBoxes: 61,
    },
    {
      id: "4",
      status: "done",
      date: "2020-01-04",
      product: "Полусухой Дикий Крест",
      volume: 20,
      plannedCount: 45,
      packing: false,
    },
    {
      id: "5",
      status: "done",
      date: "2020-01-05",
      product: "Восстание Против Пепина",
      volume: 0.33,
      plannedCount: 2100,
      packing: true,
      countInBox: 20,
      doneCount: 2100,
      doneBoxes: 45,
    },

    {
      id: "6",
      status: "planned",
      date: "2020-01-06",
      product: "Сухой Дикий Крест",
      volume: 0.45,
      plannedCount: 3600,
      packing: true,
    },
    {
      id: "7",
      status: "inProgress",
      date: "2020-01-07",
      product: "Сухой Дикий Крест",
      volume: 20,
      plannedCount: 36,
      packing: false,
    },
    {
      id: "8",
      status: "paused",
      date: "2020-01-08",
      product: "Восстание Против Пепина",
      volume: 0.33,
      plannedCount: 4150,
      packing: true,
      countInBox: 20,
      doneCount: 1220,
      doneBoxes: 61,
    },
    {
      id: "9",
      status: "done",
      date: "2020-01-09",
      product: "Полусухой Дикий Крест",
      volume: 20,
      plannedCount: 45,
      packing: false,
    },
    {
      id: "10",
      status: "done",
      date: "2020-01-10",
      product: "Восстание Против Пепина",
      volume: 0.33,
      plannedCount: 2100,
      packing: true,
      countInBox: 20,
      doneCount: 2100,
      doneBoxes: 45,
    },
  ],
};
