"use client";

import { getColumnConfig } from "@/components/ShiftTable/lib/getColumnConfig";
import { getRowActions } from "@/components/ShiftTable/lib/getRowActions";
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

import s from "./ShiftTable.module.scss";
import { IShiftData } from "@/lib/types";
import { SHIFTS_MOCK } from "@/lib/mocks";

export const ShiftTable = () => {
  const [paginationState, setPaginationState] = React.useState({
    page: SHIFTS_MOCK.page,
    pageSize: SHIFTS_MOCK.limit,
  });
  const [search, setSearch] = React.useState("");

  const ShiftTableWrapper = withTableSorting(
    withTableActions<IShiftData>(Table),
  );

  const columns = getColumnConfig();

  const handleUpdate: PaginationProps["onUpdate"] = (page, pageSize) =>
    setPaginationState((prevState) => ({ ...prevState, page, pageSize }));

  const createNewShift = () => {
    return;
  };

  return (
    <div className={s.root}>
      <TextComponent variant="display-1" qa="shift.table.header" color="info">
        Смены
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
            qa="shift.table.search"
          />
        </div>

        <div className={s.createButton}>
          <Button
            size={"l"}
            view="outlined-action"
            onClick={createNewShift}
            qa="shift.table.createButton"
          >
            <Icon data={Plus} size={18} />
            Создать новую
          </Button>
        </div>
      </div>
      <ShiftTableWrapper
        columns={columns}
        getRowActions={getRowActions}
        data={SHIFTS_MOCK.result}
        className={s.table}
        qa="shift.table"
      />

      <div className={s.pagination}>
        <Pagination
          page={paginationState.page}
          pageSize={paginationState.pageSize}
          total={SHIFTS_MOCK.total}
          onUpdate={handleUpdate}
          pageSizeOptions={[1, 5, 10, 15, 25, 50]}
          showPages
          qa="shift.table.pagination"
        />
      </div>
    </div>
  );
};
