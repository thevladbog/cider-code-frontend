/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SelectOrderToDeliveryDto = {
  status: SelectOrderToDeliveryDto.status;
  id: string;
  orderNumber: string;
  deliveryDate: any;
  consignee: string;
  address: string;
  created: any;
  modified: any;
};
export namespace SelectOrderToDeliveryDto {
  export enum status {
    NEW = "NEW",
    ARCHIVE = "ARCHIVE",
  }
}
