import { CreatedUserDto } from "@/lib/types/openapi";
import { useUserStore } from "@/entities/User/useUserStore";

export const useShiftPermissions = () => {
  const user = useUserStore((store) => store.data);

  const canChangeData =
    user?.role === CreatedUserDto.role.ADMIN ||
    user?.role === CreatedUserDto.role.SUPERVISOR;

  return {
    user,
    canChangeData,
  };
};
