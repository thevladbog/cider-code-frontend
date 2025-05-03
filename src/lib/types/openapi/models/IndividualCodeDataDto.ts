/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type IndividualCodeDataDto = {
  status: IndividualCodeDataDto.status;
  id: number;
  code: string;
  productId: string;
  created: any;
  modified: any;
  boxesCodeId: number | null;
  shiftId: string | null;
};
export namespace IndividualCodeDataDto {
  export enum status {
    NEW = "NEW",
    USED = "USED",
  }
}
