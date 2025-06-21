import { Button, Label, TableColumnConfig } from "@gravity-ui/uikit";
import { IShiftData, STATUS_COLOR_MAP, STATUS_MAP } from "@/lib/types";

export const getColumnConfig = (
  onOpenShift: (shiftId: string) => void,
): TableColumnConfig<IShiftData>[] => {
  return [
    {
      id: "id",
      name: "ID",
      align: "start",
      template: (item: IShiftData) => (
        <Button
          view="flat"
          size="s"
          onClick={() => onOpenShift(item.id)}
          qa="shift.table.id.button"
        >
          {item.id}
        </Button>
      ),
      meta: {
        defaultSortOrder: "desc",
        sort: (a: IShiftData, b: IShiftData) => a.id.localeCompare(b.id),
      },
    },
    {
      id: "date",
      name: "Дата смены",
      align: "start",
      meta: {
        defaultSortOrder: "desc",
        sort: (a: IShiftData, b: IShiftData) => {
          // Преобразуем формат DD.MM.YYYY в MM/DD/YYYY для корректного парсинга
          const parseDate = (dateStr: string) => {
            const parts = dateStr.split(".");
            if (parts.length === 3) {
              // parts[0] = день, parts[1] = месяц, parts[2] = год
              const [day, month, year] = parts;
              return new Date(`${month}/${day}/${year}`);
            }
            return new Date(dateStr); // fallback для других форматов
          };

          const dateA = parseDate(a.date);
          const dateB = parseDate(b.date);
          return dateA.getTime() - dateB.getTime();
        },
      },
    },
    {
      id: "product",
      name: "Наименование продукции",
      align: "start",
      meta: {
        defaultSortOrder: "asc",
        sort: (a: IShiftData, b: IShiftData) =>
          a.product.localeCompare(b.product),
      },
    },
    {
      id: "plannedCount",
      name: "Запланировано",
      align: "start",
      meta: {
        defaultSortOrder: "desc",
        sort: (a: IShiftData, b: IShiftData) => {
          const countA = Number(a.plannedCount) || 0;
          const countB = Number(b.plannedCount) || 0;
          return countA - countB;
        },
      },
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
