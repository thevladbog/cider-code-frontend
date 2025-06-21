/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreatedUserDto = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  picture: string | null;
  role: CreatedUserDto.role;
  created: any;
  modified: any;
};
export namespace CreatedUserDto {
  export enum role {
    ADMIN = "ADMIN",
    SUPERVISOR = "SUPERVISOR",
    USER = "USER",
    GUEST = "GUEST",
  }
}
