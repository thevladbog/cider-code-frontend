import { CreatedUserDto } from "@/lib/types/openapi";
import { USER_ROLE_COLOR_MAP, USER_ROLE_MAP } from "@/lib/types";
import { Drawer, DrawerItem } from "@gravity-ui/navigation";
import { Pencil, XmarkShape } from "@gravity-ui/icons";
import {
  Button,
  Dialog,
  Icon,
  Label,
  Loader,
  Overlay,
  Text as TextComponent,
} from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { useUserStore } from "@/entities/User/useUserStore";
import { useUsersStore } from "@/entities/User";
import { UserEditForm, UserViewDisplay } from "./components/index";
import { UpdateUserData } from "./types";

import s from "./UserInfo.module.scss";
import { useShallow } from "zustand/shallow";

type LabelTheme =
  | "normal"
  | "info"
  | "danger"
  | "warning"
  | "success"
  | "utility"
  | "unknown"
  | "clear";

export interface IUserInfoProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  userId: string;
}

export const UserInfo = (props: IUserInfoProps) => {
  const { visible, setVisible, userId } = props;
  const [currentState, setCurrentState] = useState<"view" | "edit">("view");
  const [editForm, setEditForm] = useState<UpdateUserData>({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const currentUser = useUserStore((state) => state.data);
  const { deleteUser, getOneUser, updateUser } = useUsersStore();
  const [oneUser, isOneUserLoading] = useUsersStore(
    useShallow((state) => [state.oneUser, state.isOneUserLoading, state.data]),
  );

  // Проверяем права доступа
  const canEdit =
    currentUser?.role === CreatedUserDto.role.ADMIN ||
    currentUser?.role === CreatedUserDto.role.SUPERVISOR;

  const canDelete =
    currentUser?.role === CreatedUserDto.role.ADMIN &&
    currentUser?.id !== userId; // Нельзя удалить самого себя

  // Загрузка данных пользователя
  useEffect(() => {
    if (visible && userId) {
      getOneUser(userId);
    }
  }, [userId, visible, getOneUser]);

  // Инициализация формы редактирования
  useEffect(() => {
    if (currentState === "edit" && oneUser) {
      setEditForm({
        firstName: oneUser.firstName,
        lastName: oneUser.lastName,
        email: oneUser.email,
        role: oneUser.role,
        picture: oneUser.picture || "",
      });
    }
  }, [currentState, oneUser]);

  const handleDeleteUser = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!userId) return;

    try {
      await deleteUser(userId);
      setShowDeleteDialog(false);
      setVisible(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Ошибка при удалении пользователя:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (!userId || !oneUser) return;

    try {
      const updateData: Partial<UpdateUserData> = {};

      if (editForm.firstName !== oneUser.firstName) {
        updateData.firstName = editForm.firstName;
      }
      if (editForm.lastName !== oneUser.lastName) {
        updateData.lastName = editForm.lastName;
      }
      if (editForm.email !== oneUser.email) {
        updateData.email = editForm.email;
      }
      if (editForm.role !== oneUser.role) {
        updateData.role = editForm.role;
      }
      if (editForm.picture !== oneUser.picture) {
        updateData.picture = editForm.picture;
      }

      if (Object.keys(updateData).length > 0) {
        await updateUser(userId, updateData);
      }

      setCurrentState("view");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Ошибка при сохранении изменений:", error);
    }
  };

  return (
    <Drawer
      onEscape={() => setVisible(false)}
      onVeilClick={() => setVisible(false)}
      hideVeil={false}
      keepMounted={false}
      key={userId}
    >
      <DrawerItem
        id="userInfo"
        direction="right"
        visible={visible}
        className={s.root}
      >
        {" "}
        <div className={s.wrapper}>
          <div className={s.header}>
            <div className={s.statusGroup}>
              <Label
                theme={
                  oneUser?.role
                    ? (USER_ROLE_COLOR_MAP[
                        oneUser.role as keyof typeof USER_ROLE_COLOR_MAP
                      ] as LabelTheme)
                    : "normal"
                }
                interactive
                qa="user.info.label.role"
                size="m"
              >
                {oneUser?.role
                  ? USER_ROLE_MAP[oneUser.role as keyof typeof USER_ROLE_MAP]
                  : "Неизвестно"}
              </Label>
              {canDelete && (
                <Button
                  view="outlined-danger"
                  onClick={handleDeleteUser}
                  size="m"
                  disabled={isOneUserLoading}
                >
                  Удалить пользователя
                </Button>
              )}
            </div>
            {currentState === "view" ? (
              <Button
                view="flat"
                onClick={() => setCurrentState("edit")}
                size="m"
                disabled={!canEdit}
              >
                <Icon data={Pencil} size={18} />
                Изменить
              </Button>
            ) : (
              <div className={s.editButtons}>
                <Button
                  view="action"
                  onClick={handleSaveEdit}
                  size="m"
                  disabled={isOneUserLoading}
                >
                  Сохранить
                </Button>
                <Button
                  view="flat"
                  onClick={() => setCurrentState("view")}
                  size="m"
                  disabled={isOneUserLoading}
                >
                  <Icon data={XmarkShape} size={18} />
                  Отмена
                </Button>
              </div>
            )}
          </div>

          {currentState === "view" ? (
            <UserViewDisplay user={oneUser} />
          ) : (
            <UserEditForm
              user={oneUser}
              editForm={editForm}
              setEditForm={setEditForm}
            />
          )}
        </div>
        <Overlay visible={isOneUserLoading}>
          <Loader />
        </Overlay>
      </DrawerItem>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        size="s"
      >
        <Dialog.Header caption="Подтверждение действия" />
        <Dialog.Body>
          <TextComponent>
            Вы уверены, что хотите удалить пользователя? Это действие нельзя
            отменить.
          </TextComponent>
        </Dialog.Body>
        <Dialog.Footer
          onClickButtonCancel={() => setShowDeleteDialog(false)}
          onClickButtonApply={handleConfirmDelete}
          textButtonApply="Удалить пользователя"
          textButtonCancel="Отмена"
          propsButtonApply={{ view: "outlined-danger" }}
          loading={isOneUserLoading}
        />
      </Dialog>
    </Drawer>
  );
};
