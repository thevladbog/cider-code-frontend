import { CreatedUserDto, SelectProductDto } from "@/lib/types/openapi";
import { Drawer, DrawerItem } from "@gravity-ui/navigation";
import { Pencil, XmarkShape } from "@gravity-ui/icons";
import { Button, Icon, Label, Loader, Overlay } from "@gravity-ui/uikit";
import {
  PRODUCT_STATUS_COLOR_MAP,
  PRODUCT_STATUS_COLOR_MAP_BUTTON,
  PRODUCT_STATUS_MAP,
} from "@/lib/types";

import s from "./ProductInfo.module.scss";
import { useEffect, useState } from "react";
import { useUserStore } from "@/entities/User/useUserStore";
import { useProductStore } from "@/entities/Product/useProductStore";
import { useShallow } from "zustand/shallow";
import { ChangeProductForm } from "./ChangeProductForm/ChangeProductForm";
import { ViewProductForm } from "./VewProductForm/ViewProductForm";

interface IProductInfo {
  visible: boolean;
  setVisible: (value: boolean) => void;
  productId: string;
}

export const ProductInfo = (props: IProductInfo) => {
  const { visible, setVisible, productId } = props;
  const [currentState, setCurrentState] = useState<"view" | "edit">("view");
  const [newStatus, setNewStatus] = useState<SelectProductDto["status"] | null>(
    null,
  );

  const [
    getOneProduct,
    product,
    changeProductStatus,
    isChangeLoading,
    isLoading,
  ] = useProductStore(
    useShallow((state) => [
      state.getOneProduct,
      state.oneProduct,
      state.changeProductStatus,
      state.isChangeLoading,
      state.isLoading,
    ]),
  );

  const user = useUserStore((store) => store.data);

  const canChangeData =
    user?.role === CreatedUserDto.role.ADMIN ||
    user?.role === CreatedUserDto.role.SUPERVISOR;

  useEffect(() => {
    getOneProduct(productId);
  }, []);

  useEffect(() => {
    if (newStatus !== null) {
      changeProductStatus(productId, newStatus);
    }
  }, [newStatus, productId, changeProductStatus]);

  return (
    <Drawer
      onEscape={() => setVisible(false)}
      onVeilClick={() => setVisible(false)}
      hideVeil={false}
      keepMounted={false}
      key={product?.id}
    >
      <DrawerItem
        id="productInfo"
        direction="right"
        visible={visible}
        className={s.root}
      >
        <div className={s.wrapper}>
          <div className={s.header}>
            <div className={s.statusesGroup}>
              {canChangeData ? (
                <>
                  <Button
                    view={PRODUCT_STATUS_COLOR_MAP_BUTTON["ARCHIVED"]}
                    size="m"
                    pin="circle-clear"
                    selected={
                      product?.status === SelectProductDto.status.ARCHIVED
                    }
                    disabled={!canChangeData}
                    onClick={() =>
                      setNewStatus(SelectProductDto.status.ARCHIVED)
                    }
                  >
                    {PRODUCT_STATUS_MAP["ARCHIVED"]}
                  </Button>
                  <Button
                    view={PRODUCT_STATUS_COLOR_MAP_BUTTON["INACTIVE"]}
                    size="m"
                    pin="brick-brick"
                    selected={
                      product?.status === SelectProductDto.status.INACTIVE
                    }
                    disabled={!canChangeData}
                    onClick={() =>
                      setNewStatus(SelectProductDto.status.INACTIVE)
                    }
                  >
                    {PRODUCT_STATUS_MAP["INACTIVE"]}
                  </Button>
                  <Button
                    view={PRODUCT_STATUS_COLOR_MAP_BUTTON["PAUSED"]}
                    size="m"
                    pin="brick-brick"
                    selected={
                      product?.status === SelectProductDto.status.PAUSED
                    }
                    disabled={!canChangeData}
                    onClick={() => setNewStatus(SelectProductDto.status.PAUSED)}
                  >
                    {PRODUCT_STATUS_MAP["PAUSED"]}
                  </Button>
                  <Button
                    view={PRODUCT_STATUS_COLOR_MAP_BUTTON["REGISTRATION"]}
                    size="m"
                    pin="brick-brick"
                    selected={
                      product?.status === SelectProductDto.status.REGISTRATION
                    }
                    disabled={!canChangeData}
                    onClick={() =>
                      setNewStatus(SelectProductDto.status.REGISTRATION)
                    }
                  >
                    {PRODUCT_STATUS_MAP["REGISTRATION"]}
                  </Button>
                  <Button
                    view={PRODUCT_STATUS_COLOR_MAP_BUTTON["ACTIVE"]}
                    size="m"
                    pin="clear-circle"
                    selected={
                      product?.status === SelectProductDto.status.ACTIVE
                    }
                    disabled={!canChangeData}
                    onClick={() => setNewStatus(SelectProductDto.status.ACTIVE)}
                  >
                    {PRODUCT_STATUS_MAP["ACTIVE"]}
                  </Button>
                </>
              ) : (
                <Label
                  theme={
                    PRODUCT_STATUS_COLOR_MAP[product?.status ?? "INACTIVE"]
                  }
                  interactive
                  qa="products.table.label.status"
                  size="m"
                >
                  {PRODUCT_STATUS_MAP[product?.status ?? "INACTIVE"]}
                </Label>
              )}
            </div>

            {currentState === "view" ? (
              <Button
                view="flat"
                onClick={() => setCurrentState("edit")}
                size="m"
                disabled={!canChangeData}
              >
                <Icon data={Pencil} size={18} />
                Изменить
              </Button>
            ) : (
              <Button
                view="flat"
                onClick={() => setCurrentState("view")}
                size="m"
              >
                <Icon data={XmarkShape} size={18} />
                Вернуться
              </Button>
            )}
          </div>

          {currentState === "view" ? (
            <ViewProductForm product={product} />
          ) : (
            <ChangeProductForm
              productId={productId}
              changeState={setCurrentState}
            />
          )}
        </div>
        <Overlay visible={isLoading ?? isChangeLoading}>
          <Loader />
        </Overlay>
      </DrawerItem>
    </Drawer>
  );
};
