/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateOrderToDeliveryDto = {
  id?: string;
  orderNumber: string;
  deliveryDate: any;
  status?: CreateOrderToDeliveryDto.status;
  consignee: string;
  address: string;
  created?: any;
  modified?: any;
};
export namespace CreateOrderToDeliveryDto {
  export enum status {
    NEW = "NEW",
    ARCHIVE = "ARCHIVE",
  }
}
