/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateProductDto = {
  /**
   * The unique identifier for the product
   */
  id?: string;
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
  created?: any;
  modified: any;
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
