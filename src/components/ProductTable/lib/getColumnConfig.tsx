import { Avatar, Label, TableColumnConfig } from "@gravity-ui/uikit";
import { PRODUCT_STATUS_COLOR_MAP, PRODUCT_STATUS_MAP } from "@/lib/types";
import { CreateProductDto } from "@/lib/types/openapi";

export const getColumnConfig = (): TableColumnConfig<CreateProductDto>[] => {
  return [
    {
      id: "shortName",
      name: "Краткое наименование",
      align: "start",
      meta: {
        defaultSortOrder: "desc",
        sort: (a: CreateProductDto, b: CreateProductDto) =>
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
      id: "alcoholCode",
      name: "Код продукции",
      align: "start",
    },
    {
      id: "pictureUrl",
      name: "Изображение",
      align: "start",
      template: (item: CreateProductDto) => (
        <Avatar imgUrl={item.pictureUrl ? item.pictureUrl : ""} size="xl" />
      ),
    },
    {
      id: "status",
      name: "Статус",
      template: (item: CreateProductDto) => (
        <Label
          theme={PRODUCT_STATUS_COLOR_MAP[item?.status ?? "INACTIVE"]}
          interactive
          qa="products.table.label.status"
        >
          {PRODUCT_STATUS_MAP[item?.status ?? "INACTIVE"]}
        </Label>
      ),
    },
  ];
};
