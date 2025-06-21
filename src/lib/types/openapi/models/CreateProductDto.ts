/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateProductDto = {
  shortName: string;
  fullName: string;
  gtin: string;
  alcoholCode: string;
  expirationInDays: number;
  volume:
    | number
    | string
    | {
        d: Array<number>;
        e: number;
        s: number;
        toFixed: any;
      };
  pictureUrl: string | null;
  status?: CreateProductDto.status;
};
export namespace CreateProductDto {
  export enum status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PAUSED = "PAUSED",
    REGISTRATION = "REGISTRATION",
    ARCHIVED = "ARCHIVED",
  }
}
