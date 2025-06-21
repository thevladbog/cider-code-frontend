/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedOrderToDeliveryId } from "../models/CreatedOrderToDeliveryId";
import type { CreateOrderToDeliveryDto } from "../models/CreateOrderToDeliveryDto";
import type { IOrderToDeliveryFindMany } from "../models/IOrderToDeliveryFindMany";
import type { SelectOrderToDeliveryDto } from "../models/SelectOrderToDeliveryDto";
import type { UpdateOrderToDeliveryDto } from "../models/UpdateOrderToDeliveryDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class SabyOrdersService {
  /**
   * Create delivery order
   * Creates a new delivery order in the SABY system
   * @param requestBody Json structure for order object
   * @returns CreatedOrderToDeliveryId The record has been successfully created.
   * @throws ApiError
   */
  public static sabyControllerCreate(
    requestBody: CreateOrderToDeliveryDto,
  ): CancelablePromise<CreatedOrderToDeliveryId> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/saby/order/delivery",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `Forbidden.`,
      },
    });
  }
  /**
   * Get all delivery orders
   * Retrieves a paginated list of delivery orders from the SABY system with optional filtering
   * @param page Page number
   * @param limit Items per page
   * @param status Order status filter
   * @param search Search string
   * @returns IOrderToDeliveryFindMany
   * @throws ApiError
   */
  public static sabyControllerFindAll(
    page?: number,
    limit?: number,
    status?: "NEW" | "ARCHIVE",
    search?: string,
  ): CancelablePromise<IOrderToDeliveryFindMany> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/saby/order/delivery",
      query: {
        page: page,
        limit: limit,
        status: status,
        search: search,
      },
      errors: {
        403: `Forbidden.`,
      },
    });
  }
  /**
   * Get delivery order by ID
   * Retrieves a specific delivery order from the SABY system by its ID
   * @param id
   * @returns SelectOrderToDeliveryDto
   * @throws ApiError
   */
  public static sabyControllerFindOne(
    id: string,
  ): CancelablePromise<SelectOrderToDeliveryDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/saby/order/delivery/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden.`,
        404: `Order not found.`,
      },
    });
  }
  /**
   * Update delivery order
   * Updates an existing delivery order in the SABY system by its ID
   * @param id
   * @param requestBody Json structure for order object
   * @returns UpdateOrderToDeliveryDto
   * @throws ApiError
   */
  public static sabyControllerUpdate(
    id: string,
    requestBody: UpdateOrderToDeliveryDto,
  ): CancelablePromise<UpdateOrderToDeliveryDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/saby/order/delivery/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `Forbidden.`,
        404: `Order not found.`,
      },
    });
  }
  /**
   * Update delivery order from SABY
   * Updates a delivery order with information received from the SABY system
   * @param requestBody Json structure for order object
   * @returns UpdateOrderToDeliveryDto
   * @throws ApiError
   */
  public static sabyControllerUpdateFromSaby(
    requestBody: UpdateOrderToDeliveryDto,
  ): CancelablePromise<UpdateOrderToDeliveryDto> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/saby/order/delivery/change",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `Forbidden.`,
        404: `Order not found.`,
      },
    });
  }
}
