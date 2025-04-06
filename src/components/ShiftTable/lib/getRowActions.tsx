import { TableActionConfig } from "@gravity-ui/uikit";
import { IShiftData } from "@/lib/types";

export const getRowActions = (): TableActionConfig<IShiftData>[] => {
  return [
    {
      text: "Открыть",
      handler: () => {},
    },
    {
      text: "Удалить",
      handler: () => {},
      theme: "danger",
    },
  ];
};
