"use client";

import { Magnifier, Plus } from "@gravity-ui/icons";
import {
  Button,
  Dialog,
  Icon,
  Loader,
  Overlay,
  Pagination,
  PaginationProps,
  Table,
  Text as TextComponent,
  TextInput,
  withTableActions,
  withTableSorting,
} from "@gravity-ui/uikit";
import React, { useEffect } from "react";

import s from "./ProductTable.module.scss";
import { getColumnConfig } from "@/components/ProductTable/lib/getColumnConfig";
import { getRowActions } from "@/components/ProductTable/lib/getRowActions";
import { ModalCreateProduct } from "@/components/ModalCreateProduct";
import { CreatedUserDto, SelectProductDto } from "@/lib/types/openapi";
import { useProductStore } from "@/entities/Product/useProductStore";
import { useShallow } from "zustand/shallow";
import { useUserStore } from "@/entities/User/useUserStore";
import { ProductInfo } from "../ProductInfo";

export const ProductTable = () => {
  const [data, isLoading, setSearch, search, deleteProduct, getProducts] =
    useProductStore(
      useShallow((store) => [
        store.data,
        store.isLoading,
        store.setSearch,
        store.search,
        store.deleteProduct,
        store.getProducts,
      ]),
    );
  const user = useUserStore((store) => store.data);

  const [paginationState, setPaginationState] = React.useState({
    page: 1,
    limit: 5,
  });

  const [openModal, setOpenModal] = React.useState(false);

  const ProductTableWrapper = withTableSorting(
    withTableActions<SelectProductDto>(Table),
  );

  const columns = getColumnConfig();
  const {
    actions,
    visible,
    setVisible,
    productId: selectedProduct,
    dialogProduct,
    setOpenDialog,
    openDialog,
  } = getRowActions();

  const handleUpdate: PaginationProps["onUpdate"] = (page, pageSize) => {
    setPaginationState((prev) => ({
      page,
      limit: pageSize ?? prev.limit,
    }));
  };

  const createNewProduct = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    getProducts(paginationState);
  }, [paginationState]);

  return (
    <div className={s.root}>
      <TextComponent variant="display-1" qa="product.table.header" color="info">
        Каталог продукции
      </TextComponent>
      <div className={s.header}>
        <div className={s.search}>
          <TextInput
            placeholder="Поиск по наименованию продукции ..."
            size={"l"}
            label={"Продукция:"}
            startContent={<Icon data={Magnifier} size={18} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            qa="product.table.search"
          />
        </div>

        <div className={s.createButton}>
          <Button
            size={"l"}
            view="outlined-action"
            onClick={createNewProduct}
            qa="product.table.createButton"
            disabled={user ? user.role === CreatedUserDto.role.GUEST : true}
          >
            <Icon data={Plus} size={18} />
            Создать новую
          </Button>
        </div>
      </div>
      <ProductTableWrapper
        columns={columns}
        getRowActions={() => actions}
        data={data?.result ?? []}
        className={s.table}
        qa="product.table"
      />
      <Overlay visible={isLoading}>
        <Loader />
      </Overlay>
      <div className={s.pagination}>
        <Pagination
          page={paginationState.page}
          pageSize={paginationState.limit}
          total={data?.total}
          onUpdate={handleUpdate}
          pageSizeOptions={[1, 5, 10, 15, 25, 50]}
          showPages
          qa="product.table.pagination"
        />
      </div>
      <ModalCreateProduct
        visible={openModal}
        onClose={() => setOpenModal(false)}
      />
      {dialogProduct && (
        <Dialog
          onClose={() => setOpenDialog(false)}
          open={openDialog}
          onEnterKeyDown={() => {
            alert("onEnterKeyDown");
          }}
          aria-labelledby="app-confirmation-dialog-title"
        >
          <Dialog.Header
            caption="Вы уверены, что хотите удалить продукцию?"
            id="app-confirmation-dialog-title"
          />
          <Dialog.Body>
            Вы пытаетесь удалить продукцию: {dialogProduct?.fullName}
          </Dialog.Body>
          <Dialog.Footer
            onClickButtonCancel={() => setOpenDialog(false)}
            onClickButtonApply={async () => {
              await deleteProduct(dialogProduct?.id);
              setOpenDialog(false);
            }}
            textButtonApply="Удалить"
            textButtonCancel="Отменить"
          />
        </Dialog>
      )}

      {selectedProduct && (
        <ProductInfo
          visible={visible}
          setVisible={setVisible}
          productId={selectedProduct}
        />
      )}
    </div>
  );
};
