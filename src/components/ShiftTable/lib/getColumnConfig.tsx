import { Label, TableColumnConfig } from "@gravity-ui/uikit";
import { IShiftData, STATUS_COLOR_MAP, STATUS_MAP } from "@/lib/types";

export const getColumnConfig = (): TableColumnConfig<IShiftData>[] => {
  return [
    {
      id: "id",
      name: "ID",
      align: "start",
      meta: {
        defaultSortOrder: "desc",
        sort: (a: IShiftData, b: IShiftData) => Number(a.id) - Number(b.id),
      },
    },
    {
      id: "date",
      name: "Дата смены",
      align: "start",
      meta: {
        defaultSortOrder: "desc",
        sort: (a: IShiftData, b: IShiftData) =>
          Date.parse(a.date) - Date.parse(b.date),
      },
    },
    {
      id: "product",
      name: "Наименование продукции",
      align: "start",
    },
    {
      id: "plannedCount",
      name: "Запланировано",
      align: "start",
    },
    {
      id: "status",
      name: "Статус",
      template: (item: IShiftData) => (
        <Label
          theme={STATUS_COLOR_MAP[item.status]}
          interactive
          qa="shifts.table.label.status"
        >
          {STATUS_MAP[item.status]}
        </Label>
      ),
    },
  ];
};
