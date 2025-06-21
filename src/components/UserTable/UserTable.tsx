import { getColumnConfig } from "@/components/UserTable/lib/getColumnConfig";
import { getRowActions } from "@/components/UserTable/lib/getRowActions";
import { adaptUserData, useUsersStore } from "@/entities/User";
import { UserInfo } from "@/components/UserInfo";
import { IUserData } from "@/lib/types";
import { Magnifier } from "@gravity-ui/icons";
import {
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
import React from "react";

import s from "./UserTable.module.scss";

export const UserTable = () => {
  const {
    data,
    isLoading,
    getUsers,
    setSearch,
    search,
    searchUsers,
    deleteUser,
  } = useUsersStore();

  const [paginationState, setPaginationState] = React.useState({
    page: 1,
    pageSize: 10,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string>("");
  const [selectedUserName, setSelectedUserName] = React.useState<string>("");
  const [isUserInfoOpen, setIsUserInfoOpen] = React.useState(false);
  const [userInfoId, setUserInfoId] = React.useState<string>("");

  // Дебаунс для поиска
  const [searchTimeout, setSearchTimeout] =
    React.useState<NodeJS.Timeout | null>(null);

  const UserTableWrapper = withTableSorting(withTableActions<IUserData>(Table));

  // Адаптируем данные для отображения в таблице
  const adaptedData = React.useMemo(() => {
    return data?.result?.map(adaptUserData) || [];
  }, [data?.result]);
  const handleOpenUser = (userId: string) => {
    setUserInfoId(userId);
    setIsUserInfoOpen(true);
  };

  const handleDeleteUserClick = (userId: string) => {
    const user = adaptedData.find((u) => u.id === userId);
    if (user) {
      setSelectedUserId(userId);
      setSelectedUserName(`${user.firstName} ${user.lastName}`);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      await deleteUser(selectedUserId);
      setDeleteDialogOpen(false);
      setSelectedUserId("");
      setSelectedUserName("");
    }
  };

  const columns = getColumnConfig();
  const rowActions = getRowActions(handleOpenUser, handleDeleteUserClick);

  const handleUpdate: PaginationProps["onUpdate"] = (page, pageSize) => {
    setPaginationState({ page, pageSize });
    // Если есть поисковый запрос, используем searchUsers, иначе getUsers
    if (search) {
      searchUsers({ page, limit: pageSize, search });
    } else {
      getUsers({ page, limit: pageSize });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value || undefined);

    // Очищаем предыдущий таймаут
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Устанавливаем новый таймаут для дебаунса (1500ms)
    const newTimeout = setTimeout(() => {
      // Сбрасываем пагинацию на первую страницу при поиске
      const newPaginationState = {
        page: 1,
        pageSize: paginationState.pageSize,
      };
      setPaginationState(newPaginationState);

      // Выполняем поиск через API
      searchUsers({
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
      searchUsers({
        page: paginationState.page,
        limit: paginationState.pageSize,
        search,
      });
    } else {
      getUsers({
        page: paginationState.page,
        limit: paginationState.pageSize,
      });
    }
  }, [
    getUsers,
    searchUsers,
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
      <TextComponent variant="display-1" qa="users.table.header" color="info">
        Пользователи
      </TextComponent>
      <div className={s.header}>
        <div className={s.search}>
          <TextInput
            placeholder="Поиск по имени или email ..."
            size="l"
            label="Имя, фамилия или email:"
            startContent={<Icon data={Magnifier} size={18} />}
            value={search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            qa="users.table.search"
            hasClear
          />
        </div>
      </div>
      <UserTableWrapper
        columns={columns}
        getRowActions={() => rowActions}
        data={adaptedData}
        className={s.table}
        qa="users.table"
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
          pageSizeOptions={[5, 10, 15, 25, 50]}
          showPages
          qa="users.table.pagination"
        />
      </div>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-user-dialog-title"
      >
        <Dialog.Header caption="Подтверждение удаления" />
        <Dialog.Body>
          <TextComponent>
            Вы уверены, что хотите удалить пользователя{" "}
            <strong>{selectedUserName}</strong>?
          </TextComponent>
          <TextComponent color="danger">
            Это действие нельзя отменить.
          </TextComponent>
        </Dialog.Body>
        <Dialog.Footer
          onClickButtonCancel={() => setDeleteDialogOpen(false)}
          onClickButtonApply={handleConfirmDelete}
          textButtonApply="Удалить"
          textButtonCancel="Отмена"
        />
      </Dialog>

      <UserInfo
        visible={isUserInfoOpen}
        setVisible={setIsUserInfoOpen}
        userId={userInfoId}
      />
    </div>
  );
};
