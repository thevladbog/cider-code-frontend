import { CreatedUserDto } from "@/lib/types/openapi";
import { IUserData } from "@/lib/types";

export const adaptUserData = (user: CreatedUserDto): IUserData => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  picture: user.picture,
  role: user.role,
  created: user.created,
  modified: user.modified,
});
