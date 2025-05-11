import { TableActionConfig } from "@gravity-ui/uikit";

import { useProductStore } from "@/entities/Product/useProductStore";
import { CreatedUserDto, SelectProductDto } from "@/lib/types/openapi";
import { useUserStore } from "@/entities/User/useUserStore";
import { useState } from "react";

interface IRowActions {
  actions: TableActionConfig<SelectProductDto>[];
  visible: boolean;
  setVisible: (value: boolean) => void;
  productId: string | null;
}

export const getRowActions = (): IRowActions => {
  const deleteProduct = useProductStore((store) => store.deleteProduct);
  const user = useUserStore((store) => store.data);

  const [visible, setVisible] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  const canDelete =
    user?.role === CreatedUserDto.role.SUPERVISOR ||
    user?.role === CreatedUserDto.role.ADMIN;

  const handleOpen = (value: boolean, selectedProductId: string) => {
    setVisible(value);
    setProductId(selectedProductId);
  };

  return {
    actions: [
      {
        text: "Открыть",
        handler: (row) => handleOpen(true, row.id),
      },
      {
        text: "Удалить",
        handler: async (row) => {
          await deleteProduct(row.id);
        },
        theme: "danger",
        disabled: !canDelete,
      },
    ],
    visible,
    productId,
    setVisible,
  };
};
