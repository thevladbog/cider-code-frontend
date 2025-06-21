/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateUserDto = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  picture?: string;
  role?: UpdateUserDto.role;
};
export namespace UpdateUserDto {
  export enum role {
    ADMIN = "ADMIN",
    SUPERVISOR = "SUPERVISOR",
    USER = "USER",
    GUEST = "GUEST",
  }
}
