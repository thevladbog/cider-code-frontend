/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateOrderToDeliveryDto = {
  id: string;
  orderNumber?: string;
  deliveryDate?: any;
  status?: UpdateOrderToDeliveryDto.status;
  consignee?: string;
  address?: string;
};
export namespace UpdateOrderToDeliveryDto {
  export enum status {
    NEW = "NEW",
    ARCHIVE = "ARCHIVE",
  }
}
