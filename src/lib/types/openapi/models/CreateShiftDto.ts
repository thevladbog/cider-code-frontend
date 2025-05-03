/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateShiftDto = {
  id?: string;
  plannedDate?: any;
  plannedCount: number | null;
  factCount: number | null;
  packing?: boolean;
  countInBox: number | null;
  status?: CreateShiftDto.status;
  productId: string;
};
export namespace CreateShiftDto {
  export enum status {
    PLANNED = "PLANNED",
    INPROGRESS = "INPROGRESS",
    PAUSED = "PAUSED",
    DONE = "DONE",
    CANCELED = "CANCELED",
  }
}
