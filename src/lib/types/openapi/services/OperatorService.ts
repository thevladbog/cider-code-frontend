/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedOperatorDto } from "../models/CreatedOperatorDto";
import type { CreateOperatorDto } from "../models/CreateOperatorDto";
import type { IOperatorFindMay } from "../models/IOperatorFindMay";
import type { IOperatorFindOne } from "../models/IOperatorFindOne";
import type { LoginOperatorDto } from "../models/LoginOperatorDto";
import type { UpdateOperatorDto } from "../models/UpdateOperatorDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class OperatorService {
  /**
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
   * @param page Page number
   * @param limit Items per page
   * @returns IOperatorFindMay Returns a list of users
   * @throws ApiError
   */
  public static operatorControllerFindAll(
    page?: number,
    limit?: number,
  ): CancelablePromise<IOperatorFindMay> {
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
   * @param requestBody
   * @returns boolean Operator login successful
   * @throws ApiError
   */
  public static operatorControllerLogin(
    requestBody: LoginOperatorDto,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/operator/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * @param id
   * @returns IOperatorFindOne Returns the requested user
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
        404: `User can't be found or something went wrong`,
      },
    });
  }
  /**
   * @returns IOperatorFindOne
   * @throws ApiError
   */
  public static operatorControllerGetMe(): CancelablePromise<IOperatorFindOne> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/operator/me",
    });
  }
}
