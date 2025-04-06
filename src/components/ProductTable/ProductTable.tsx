"use client";

import { Magnifier, Plus } from "@gravity-ui/icons";
import {
  Button,
  Icon,
  Pagination,
  PaginationProps,
  Table,
  Text as TextComponent,
  TextInput,
  withTableActions,
  withTableSorting,
} from "@gravity-ui/uikit";
import React from "react";

import s from "./ProductTable.module.scss";
import { IProduct } from "@/lib/types";
import { PRODUCTS_MOCK } from "@/lib/mocks";
import { getColumnConfig } from "@/components/ProductTable/lib/getColumnConfig";
import { getRowActions } from "@/components/ProductTable/lib/getRowActions";

export const ProductTable = () => {
  const [paginationState, setPaginationState] = React.useState({
    page: PRODUCTS_MOCK.page,
    pageSize: PRODUCTS_MOCK.limit,
  });
  const [search, setSearch] = React.useState("");

  const ProductTableWrapper = withTableSorting(
    withTableActions<IProduct>(Table),
  );

  const columns = getColumnConfig();

  const handleUpdate: PaginationProps["onUpdate"] = (page, pageSize) =>
    setPaginationState((prevState) => ({ ...prevState, page, pageSize }));

  const createNewProduct = () => {
    return;
  };

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
          >
            <Icon data={Plus} size={18} />
            Создать новую
          </Button>
        </div>
      </div>
      <ProductTableWrapper
        columns={columns}
        getRowActions={getRowActions}
        data={PRODUCTS_MOCK.result}
        className={s.table}
        qa="product.table"
      />

      <div className={s.pagination}>
        <Pagination
          page={paginationState.page}
          pageSize={paginationState.pageSize}
          total={PRODUCTS_MOCK.total}
          onUpdate={handleUpdate}
          pageSizeOptions={[1, 5, 10, 15, 25, 50]}
          showPages
          qa="product.table.pagination"
        />
      </div>
    </div>
  );
};
