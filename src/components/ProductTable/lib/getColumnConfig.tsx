import { Avatar, Label, TableColumnConfig } from "@gravity-ui/uikit";
import {
  IProduct,
  PRODUCT_STATUS_COLOR_MAP,
  PRODUCT_STATUS_MAP,
} from "@/lib/types";

export const getColumnConfig = (): TableColumnConfig<IProduct>[] => {
  return [
    {
      id: "shortName",
      name: "Краткое наименование",
      align: "start",
      meta: {
        defaultSortOrder: "desc",
        sort: (a: IProduct, b: IProduct) =>
          a.shortName.localeCompare(b.shortName),
      },
    },
    {
      id: "volume",
      name: "Объем, л.",
      align: "start",
    },
    {
      id: "gtin",
      name: "GTIN",
      align: "start",
    },
    {
      id: "pictureUrl",
      name: "Изображение",
      align: "start",
      template: (item: IProduct) => (
        <Avatar imgUrl={item.pictureUrl ? item.pictureUrl : ""} size="xl" />
      ),
    },
    {
      id: "status",
      name: "Статус",
      template: (item: IProduct) => (
        <Label
          theme={PRODUCT_STATUS_COLOR_MAP[item.status]}
          interactive
          qa="products.table.label.status"
        >
          {PRODUCT_STATUS_MAP[item.status]}
        </Label>
      ),
    },
  ];
};
