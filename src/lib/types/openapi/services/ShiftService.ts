/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateShiftByOperatorDto } from "../models/CreateShiftByOperatorDto";
import type { CreateShiftDto } from "../models/CreateShiftDto";
import type { IDeletedShift } from "../models/IDeletedShift";
import type { IShiftFindMany } from "../models/IShiftFindMany";
import type { IShiftFindOne } from "../models/IShiftFindOne";
import type { ShiftDto } from "../models/ShiftDto";
import type { UpdateShiftDto } from "../models/UpdateShiftDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ShiftService {
  /**
   * Create shift
   * Create a new production shift with product and planning details
   * @param requestBody
   * @returns ShiftDto Shift successfully created
   * @throws ApiError
   */
  public static shiftControllerCreate(
    requestBody: CreateShiftDto,
  ): CancelablePromise<ShiftDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/shift",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Data isn't unique`,
      },
    });
  }
  /**
   * Get all shifts
   * Retrieve a paginated list of all production shifts
   * @param page Page number
   * @param limit Items per page
   * @returns IShiftFindMany Returns a list of shifts
   * @throws ApiError
   */
  public static shiftControllerFindAll(
    page?: number,
    limit?: number,
  ): CancelablePromise<IShiftFindMany> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/shift",
      query: {
        page: page,
        limit: limit,
      },
    });
  }
  /**
   * Get all shifts for operator
   * Retrieve a paginated list of all production shifts accessible by operators
   * @param page Page number
   * @param limit Items per page
   * @returns IShiftFindMany Returns a list of shifts
   * @throws ApiError
   */
  public static shiftControllerFindAllForApp(
    page?: number,
    limit?: number,
  ): CancelablePromise<IShiftFindMany> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/shift/operator",
      query: {
        page: page,
        limit: limit,
      },
    });
  }
  /**
   * Get shift by ID
   * Retrieve detailed information about a specific production shift
   * @param id
   * @returns IShiftFindOne Returns the requested shift
   * @throws ApiError
   */
  public static shiftControllerFindOne(
    id: string,
  ): CancelablePromise<IShiftFindOne> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/shift/{id}",
      path: {
        id: id,
      },
      errors: {
        404: `Shift can't be found or something went wrong`,
      },
    });
  }
  /**
   * Update shift
   * Update information about an existing production shift such as planned count, status, etc.
   * @param id
   * @param requestBody
   * @returns ShiftDto Shift successfully updated
   * @throws ApiError
   */
  public static shiftControllerUpdate(
    id: string,
    requestBody: UpdateShiftDto,
  ): CancelablePromise<ShiftDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/shift/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `Shift can't be found or something went wrong`,
      },
    });
  }
  /**
   * Delete shift
   * Remove a production shift from the system
   * @param id
   * @returns IDeletedShift Shift has been deleted
   * @throws ApiError
   */
  public static shiftControllerRemove(
    id: string,
  ): CancelablePromise<IDeletedShift> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/shift/{id}",
      path: {
        id: id,
      },
      errors: {
        404: `Shift can't be found or something went wrong`,
      },
    });
  }
  /**
   * Get shift by ID for operator
   * Retrieve detailed information about a specific production shift for operators
   * @param id
   * @returns IShiftFindOne Returns the requested shift
   * @throws ApiError
   */
  public static shiftControllerFindOneForApp(
    id: string,
  ): CancelablePromise<IShiftFindOne> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/shift/operator/{id}",
      path: {
        id: id,
      },
      errors: {
        404: `Shift can't be found or something went wrong`,
      },
    });
  }
  /**
   * Create shift by operator
   * Create a new production shift by operator using EAN/GTIN code
   * @param requestBody
   * @returns IShiftFindOne Shift successfully created by operator
   * @throws ApiError
   */
  public static shiftControllerCreateByOperator(
    requestBody: CreateShiftByOperatorDto,
  ): CancelablePromise<IShiftFindOne> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/shift/operator/create",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Invalid data or product not found`,
        404: `Product with specified GTIN not found or not active`,
      },
    });
  }
}
