import { CreatedUserDto } from "@/lib/types/openapi";

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: CreatedUserDto.role;
  picture?: string;
}
