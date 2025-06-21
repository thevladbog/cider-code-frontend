import { Avatar, Label, TableColumnConfig } from "@gravity-ui/uikit";
import { IUserData, USER_ROLE_COLOR_MAP, USER_ROLE_MAP } from "@/lib/types";

export const getColumnConfig = (): TableColumnConfig<IUserData>[] => {
  return [
    {
      id: "picture",
      name: "Фото",
      align: "start",
      template: (item: IUserData) => (
        <Avatar
          imgUrl={item.picture ?? ""}
          size="l"
          fallbackImgUrl=""
          text={`${item.firstName?.[0] ?? ""}${item.lastName?.[0] ?? ""}`}
        />
      ),
    },
    {
      id: "firstName",
      name: "Имя",
      align: "start",
      meta: {
        defaultSortOrder: "desc",
        sort: (a: IUserData, b: IUserData) =>
          a.firstName.localeCompare(b.firstName),
      },
    },
    {
      id: "lastName",
      name: "Фамилия",
      align: "start",
      meta: {
        defaultSortOrder: "desc",
        sort: (a: IUserData, b: IUserData) =>
          a.lastName.localeCompare(b.lastName),
      },
    },
    {
      id: "email",
      name: "Email",
      align: "start",
    },
    {
      id: "role",
      name: "Роль",
      template: (item: IUserData) => (
        <Label
          theme={
            USER_ROLE_COLOR_MAP[
              item.role as keyof typeof USER_ROLE_COLOR_MAP
            ] ?? "utility"
          }
          interactive
          qa="users.table.label.role"
        >
          {USER_ROLE_MAP[item.role as keyof typeof USER_ROLE_MAP] ?? item.role}
        </Label>
      ),
    },
  ];
};
