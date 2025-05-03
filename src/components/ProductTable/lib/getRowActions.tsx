import { TableActionConfig } from "@gravity-ui/uikit";
import { CreateProductDto } from "@/lib/types/openapi";

export const getRowActions = (): TableActionConfig<CreateProductDto>[] => {
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
