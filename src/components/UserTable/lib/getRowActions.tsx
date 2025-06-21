import { TableActionConfig } from "@gravity-ui/uikit";
import { IUserData } from "@/lib/types";
import { CreatedUserDto } from "@/lib/types/openapi";
import { useUserStore } from "@/entities/User/useUserStore";

export const getRowActions = (
  handleOpenUser: (userId: string) => void,
  handleDeleteUser: (userId: string) => void,
): TableActionConfig<IUserData>[] => {
  const user = useUserStore((store) => store.data);

  const canDelete =
    user?.role === CreatedUserDto.role.ADMIN ||
    user?.role === CreatedUserDto.role.SUPERVISOR;

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
