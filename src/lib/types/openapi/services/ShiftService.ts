/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateShiftDto } from "../models/CreateShiftDto";
import type { IDeletedShift } from "../models/IDeletedShift";
import type { IShiftFindMay } from "../models/IShiftFindMay";
import type { IShiftFindOne } from "../models/IShiftFindOne";
import type { ShiftDto } from "../models/ShiftDto";
import type { UpdateShiftDto } from "../models/UpdateShiftDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ShiftService {
  /**
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
   * @param page Page number
   * @param limit Items per page
   * @returns IShiftFindMay Returns a list of shifts
   * @throws ApiError
   */
  public static shiftControllerFindAll(
    page?: number,
    limit?: number,
  ): CancelablePromise<IShiftFindMay> {
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
   * @param id
   * @param requestBody
   * @returns ShiftDto
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
}
