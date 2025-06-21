import { TableActionConfig } from "@gravity-ui/uikit";
import { IShiftData } from "@/lib/types";

export const getRowActions = (
  onOpenShift: (shiftId: string) => void,
): TableActionConfig<IShiftData>[] => {
  return [
    {
      text: "Открыть",
      handler: (item) => {
        onOpenShift(item.id);
      },
    },
    {
      text: "Удалить",
      handler: () => {},
      theme: "danger",
    },
  ];
};
