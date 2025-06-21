import { TableActionConfig } from "@gravity-ui/uikit";
import { IUserData } from "@/lib/types";
import { CreatedUserDto } from "@/lib/types/openapi";

export const getRowActions = (
  handleOpenUser: (userId: string) => void,
  handleDeleteUser: (userId: string) => void,
  currentUser: CreatedUserDto | null,
): TableActionConfig<IUserData>[] => {
  const canDelete =
    currentUser?.role === CreatedUserDto.role.ADMIN ||
    currentUser?.role === CreatedUserDto.role.SUPERVISOR;

  const actions: TableActionConfig<IUserData>[] = [
    {
      text: "Открыть",
      handler: (row) => handleOpenUser(row.id),
    },
  ];

  if (canDelete) {
    actions.push({
      text: "Удалить",
      theme: "danger",
      handler: (row) => handleDeleteUser(row.id),
    });
  }

  return actions;
};
