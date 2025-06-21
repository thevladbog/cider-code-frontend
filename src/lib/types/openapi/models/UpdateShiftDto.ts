/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateShiftDto = {
  plannedDate?: any;
  plannedCount?: number;
  packing?: boolean;
  countInBox?: number;
  status?: UpdateShiftDto.status;
};
export namespace UpdateShiftDto {
  export enum status {
    PLANNED = "PLANNED",
    INPROGRESS = "INPROGRESS",
    PAUSED = "PAUSED",
    DONE = "DONE",
    CANCELED = "CANCELED",
  }
}
