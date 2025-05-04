/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WriteIndividualCodeDto = {
  code: string;
  status: WriteIndividualCodeDto.status;
  productId: string;
  boxesCodeId?: number;
  shiftId?: string;
};
export namespace WriteIndividualCodeDto {
  export enum status {
    NEW = "NEW",
    USED = "USED",
  }
}
