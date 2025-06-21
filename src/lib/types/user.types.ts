export interface IUserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string | null;
  role: string;
  created: string;
  modified: string;
}

export const USER_ROLE_MAP = {
  ADMIN: "Администратор",
  SUPERVISOR: "Супервизор",
  USER: "Пользователь",
  GUEST: "Гость",
} as const;

export const USER_ROLE_COLOR_MAP = {
  ADMIN: "danger",
  SUPERVISOR: "warning",
  USER: "info",
  GUEST: "utility",
} as const;
