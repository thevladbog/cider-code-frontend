import { TableActionConfig } from "@gravity-ui/uikit";
import { CreatedUserDto, SelectProductDto } from "@/lib/types/openapi";
import { useUserStore } from "@/entities/User/useUserStore";
import { useState } from "react";

interface IRowActions {
  actions: TableActionConfig<SelectProductDto>[];
  visible: boolean;
  setVisible: (value: boolean) => void;
  productId: string | null;
  dialogProduct: SelectProductDto | null;
  setOpenDialog: (value: boolean) => void;
  openDialog: boolean;
}

export const getRowActions = (): IRowActions => {
  const user = useUserStore((store) => store.data);

  const [visible, setVisible] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogProduct, setDialogProduct] = useState<SelectProductDto | null>(
    null,
  );

  const canDelete =
    user?.role === CreatedUserDto.role.SUPERVISOR ||
    user?.role === CreatedUserDto.role.ADMIN;

  const handleOpen = (value: boolean, selectedProductId: string) => {
    setVisible(value);
    setProductId(selectedProductId);
  };

  const handleOpenDialog = (value: boolean, product: SelectProductDto) => {
    setOpenDialog(value);
    setDialogProduct(product);
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
          handleOpenDialog(true, row);
        },
        theme: "danger",
        disabled: !canDelete,
      },
    ],
    visible,
    productId,
    setVisible,
    dialogProduct,
    setOpenDialog,
    openDialog,
  };
};
