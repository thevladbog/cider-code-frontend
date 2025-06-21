import { getColumnConfig } from "@/components/ShiftTable/lib/getColumnConfig";
import { getRowActions } from "@/components/ShiftTable/lib/getRowActions";
import { ModalCreateShift } from "@/components/ModalCreateShift";
import { ShiftInfo } from "@/components/ShiftInfo";
import { adaptShiftData, useShiftStore } from "@/entities/Shift";
import { Magnifier, Plus } from "@gravity-ui/icons";
import {
  Button,
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
import React from "react";

import s from "./ShiftTable.module.scss";
import { IShiftData } from "@/lib/types";

export const ShiftTable = () => {
  const { data, isLoading, getShifts, setSearch, search, searchShifts } =
    useShiftStore();

  const [paginationState, setPaginationState] = React.useState({
    page: 1,
    pageSize: 10,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isShiftInfoOpen, setIsShiftInfoOpen] = React.useState(false);
  const [selectedShiftId, setSelectedShiftId] = React.useState<string>("");

  // Дебаунс для поиска
  const [searchTimeout, setSearchTimeout] =
    React.useState<NodeJS.Timeout | null>(null);

  const ShiftTableWrapper = withTableSorting(
    withTableActions<IShiftData>(Table),
  );

  const handleOpenShift = (shiftId: string) => {
    setSelectedShiftId(shiftId);
    setIsShiftInfoOpen(true);
  };

  const columns = getColumnConfig(handleOpenShift);

  // Адаптируем данные для отображения в таблице
  const adaptedData = React.useMemo(() => {
    return data?.result?.map(adaptShiftData) || [];
  }, [data?.result]);

  const handleUpdate: PaginationProps["onUpdate"] = (page, pageSize) => {
    setPaginationState({ page, pageSize });
    // Если есть поисковый запрос, используем searchShifts, иначе getShifts
    if (search) {
      searchShifts({ page, limit: pageSize, search });
    } else {
      getShifts({ page, limit: pageSize });
    }
  };

  const createNewShift = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    // Обновляем данные после создания смены с учетом текущего поиска
    if (search) {
      searchShifts({
        page: paginationState.page,
        limit: paginationState.pageSize,
        search,
      });
    } else {
      getShifts({
        page: paginationState.page,
        limit: paginationState.pageSize,
      });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value || undefined);

    // Очищаем предыдущий таймаут
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Устанавливаем новый таймаут для дебаунса (500ms)
    const newTimeout = setTimeout(() => {
      // Сбрасываем пагинацию на первую страницу при поиске
      const newPaginationState = {
        page: 1,
        pageSize: paginationState.pageSize,
      };
      setPaginationState(newPaginationState);

      // Выполняем поиск через API
      searchShifts({
        page: newPaginationState.page,
        limit: newPaginationState.pageSize,
        search: value || undefined,
      });
    }, 1500);

    setSearchTimeout(newTimeout);
  };

  // Загружаем данные при монтировании компонента и изменении пагинации
  React.useEffect(() => {
    if (search) {
      searchShifts({
        page: paginationState.page,
        limit: paginationState.pageSize,
        search,
      });
    } else {
      getShifts({
        page: paginationState.page,
        limit: paginationState.pageSize,
      });
    }
  }, [
    getShifts,
    searchShifts,
    paginationState.page,
    paginationState.pageSize,
    search,
  ]);

  // Очищаем таймаут при размонтировании компонента
  React.useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

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
            label={"Продукция или id смены:"}
            startContent={<Icon data={Magnifier} size={18} />}
            value={search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            qa="shift.table.search"
            hasClear
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
        getRowActions={() => getRowActions(handleOpenShift)}
        data={adaptedData}
        className={s.table}
        qa="shift.table"
      />
      <Overlay visible={isLoading}>
        <Loader />
      </Overlay>

      <div className={s.pagination}>
        <Pagination
          page={paginationState.page}
          pageSize={paginationState.pageSize}
          total={data?.total || 0}
          onUpdate={handleUpdate}
          pageSizeOptions={[1, 5, 10, 15, 25, 50]}
          showPages
          qa="shift.table.pagination"
        />
      </div>

      <ModalCreateShift
        visible={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />

      <ShiftInfo
        visible={isShiftInfoOpen}
        setVisible={setIsShiftInfoOpen}
        shiftId={selectedShiftId}
      />
    </div>
  );
};
