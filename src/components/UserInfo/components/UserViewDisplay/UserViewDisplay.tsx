import { CreatedUserDto } from "@/lib/types/openapi";
import { Avatar, Text as TextComponent } from "@gravity-ui/uikit";
import React from "react";

import s from "./UserViewDisplay.module.scss";

interface IUserViewDisplayProps {
  user: CreatedUserDto | null;
}

export const UserViewDisplay: React.FC<IUserViewDisplayProps> = ({ user }) => {
  if (!user) {
    return (
      <div className={s.root}>
        <TextComponent variant="body-2">
          Данные пользователя не найдены
        </TextComponent>
      </div>
    );
  }

  const formatDate = (dateString?: unknown) => {
    if (!dateString) return "Не указано";
    try {
      const date = new Date(dateString as string);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Некорректная дата";
    }
  };

  return (
    <div className={s.root}>
      <div className={s.avatarSection}>
        <Avatar
          imgUrl={user.picture || ""}
          size="xl"
          text={`${user.firstName[0]}${user.lastName[0]}`}
        />
        <div className={s.nameSection}>
          <TextComponent variant="header-2" qa="user.info.fullName">
            {user.firstName} {user.lastName}
          </TextComponent>
          <TextComponent
            variant="body-2"
            color="secondary"
            qa="user.info.email"
          >
            {user.email}
          </TextComponent>
        </div>
      </div>

      <div className={s.infoSection}>
        <div className={s.infoRow}>
          <TextComponent variant="body-2" color="secondary">
            ID пользователя:
          </TextComponent>
          <TextComponent variant="body-2" qa="user.info.id">
            {user.id}
          </TextComponent>
        </div>

        <div className={s.infoRow}>
          <TextComponent variant="body-2" color="secondary">
            URL фотографии:
          </TextComponent>
          <TextComponent variant="body-2" qa="user.info.picture">
            {user.picture || "Не указано"}
          </TextComponent>
        </div>

        <div className={s.infoRow}>
          <TextComponent variant="body-2" color="secondary">
            Дата создания:
          </TextComponent>
          <TextComponent variant="body-2" qa="user.info.created">
            {formatDate(user.created)}
          </TextComponent>
        </div>

        <div className={s.infoRow}>
          <TextComponent variant="body-2" color="secondary">
            Последнее изменение:
          </TextComponent>
          <TextComponent variant="body-2" qa="user.info.modified">
            {formatDate(user.modified)}
          </TextComponent>
        </div>
      </div>
    </div>
  );
};
