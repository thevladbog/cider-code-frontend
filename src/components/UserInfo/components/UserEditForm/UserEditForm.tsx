import { CreatedUserDto } from "@/lib/types/openapi";
import { UpdateUserData } from "../../types";
import { Select, Text as TextComponent, TextInput } from "@gravity-ui/uikit";
import React from "react";

import s from "./UserEditForm.module.scss";

interface IUserEditFormProps {
  user: CreatedUserDto | null;
  editForm: UpdateUserData;
  setEditForm: (data: UpdateUserData) => void;
}

const roleOptions = [
  { value: CreatedUserDto.role.ADMIN, content: "Администратор" },
  { value: CreatedUserDto.role.SUPERVISOR, content: "Супервизор" },
  { value: CreatedUserDto.role.USER, content: "Пользователь" },
  { value: CreatedUserDto.role.GUEST, content: "Гость" },
];

export const UserEditForm: React.FC<IUserEditFormProps> = ({
  user,
  editForm,
  setEditForm,
}) => {
  if (!user) {
    return (
      <div className={s.root}>
        <TextComponent variant="body-2">
          Данные пользователя не найдены
        </TextComponent>
      </div>
    );
  }

  const handleInputChange = (field: keyof UpdateUserData, value: string) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const handleRoleChange = (value: string[]) => {
    if (value.length > 0) {
      setEditForm({ ...editForm, role: value[0] as CreatedUserDto.role });
    }
  };

  return (
    <div className={s.root}>
      <div className={s.formSection}>
        <TextComponent variant="header-2">
          Редактирование пользователя
        </TextComponent>

        <div className={s.formGroup}>
          <TextInput
            label="Имя"
            value={editForm.firstName || ""}
            onUpdate={(value) => handleInputChange("firstName", value)}
            placeholder="Введите имя"
            qa="user.edit.firstName"
          />
        </div>

        <div className={s.formGroup}>
          <TextInput
            label="Фамилия"
            value={editForm.lastName || ""}
            onUpdate={(value) => handleInputChange("lastName", value)}
            placeholder="Введите фамилию"
            qa="user.edit.lastName"
          />
        </div>

        <div className={s.formGroup}>
          <TextInput
            label="Email"
            type="email"
            value={editForm.email || ""}
            onUpdate={(value) => handleInputChange("email", value)}
            placeholder="Введите email"
            qa="user.edit.email"
          />
        </div>

        <div className={s.formGroup}>
          <TextInput
            label="URL фотографии"
            type="url"
            value={editForm.picture || ""}
            onUpdate={(value) => handleInputChange("picture", value)}
            placeholder="Введите URL фотографии"
            qa="user.edit.picture"
          />
        </div>

        <div className={s.formGroup}>
          <Select
            label="Роль"
            value={editForm.role ? [editForm.role] : []}
            onUpdate={handleRoleChange}
            options={roleOptions}
            placeholder="Выберите роль"
            qa="user.edit.role"
          />
        </div>
      </div>
    </div>
  );
};
