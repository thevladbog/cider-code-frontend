/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedOperatorDto } from "../models/CreatedOperatorDto";
import type { CreateOperatorDto } from "../models/CreateOperatorDto";
import type { CreateShiftByOperatorDto } from "../models/CreateShiftByOperatorDto";
import type { IOperatorFindMany } from "../models/IOperatorFindMany";
import type { IOperatorFindOne } from "../models/IOperatorFindOne";
import type { IShiftFindMany } from "../models/IShiftFindMany";
import type { IShiftFindOne } from "../models/IShiftFindOne";
import type { LoginOperatorDto } from "../models/LoginOperatorDto";
import type { OperatorLoginResponse } from "../models/OperatorLoginResponse";
import type { UpdateOperatorDto } from "../models/UpdateOperatorDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class OperatorService {
  /**
   * Create operator
   * Create a new operator account in the system
   * @param requestBody
   * @returns CreatedOperatorDto User successfully created
   * @throws ApiError
   */
  public static operatorControllerCreateOperator(
    requestBody: CreateOperatorDto,
  ): CancelablePromise<CreatedOperatorDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/operator",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get all operators
   * Retrieve a paginated list of all operators in the system
   * @param page Page number
   * @param limit Items per page
   * @returns IOperatorFindMany Returns a list of operators
   * @throws ApiError
   */
  public static operatorControllerFindAll(
    page?: number,
    limit?: number,
  ): CancelablePromise<IOperatorFindMany> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/operator",
      query: {
        page: page,
        limit: limit,
      },
    });
  }
  /**
   * Update operator
   * Update operator information such as name or barcode
   * @param id
   * @param requestBody
   * @returns IOperatorFindOne
   * @throws ApiError
   */
  public static operatorControllerUpdateOperator(
    id: string,
    requestBody: UpdateOperatorDto,
  ): CancelablePromise<IOperatorFindOne> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/operator/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `Operator not found`,
      },
    });
  }
  /**
   * Login operator
   * Authenticate an operator using barcode and return JWT token
   * @param requestBody
   * @returns OperatorLoginResponse Operator login successful
   * @throws ApiError
   */
  public static operatorControllerLogin(
    requestBody: LoginOperatorDto,
  ): CancelablePromise<OperatorLoginResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/operator/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get operator by ID
   * Retrieve detailed information about a specific operator
   * @param id
   * @returns IOperatorFindOne Returns the requested operator
   * @throws ApiError
   */
  public static operatorControllerFindOne(
    id: string,
  ): CancelablePromise<IOperatorFindOne> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/operator/one/{id}",
      path: {
        id: id,
      },
      errors: {
        404: `Operator can't be found or something went wrong`,
      },
    });
  }
  /**
   * Get current operator
   * Get details of the currently authenticated operator
   * @returns IOperatorFindOne Returns current operator information
   * @throws ApiError
   */
  public static operatorControllerGetMe(): CancelablePromise<IOperatorFindOne> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/operator/me",
      errors: {
        401: `Unauthorized or operator token missing`,
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
