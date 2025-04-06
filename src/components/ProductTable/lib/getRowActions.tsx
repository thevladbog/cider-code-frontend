import { TableActionConfig } from "@gravity-ui/uikit";
import { IProduct } from "@/lib/types";

export const getRowActions = (): TableActionConfig<IProduct>[] => {
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
