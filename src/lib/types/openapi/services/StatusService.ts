/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateCodesStatusDto } from "../models/UpdateCodesStatusDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class StatusService {
  /**
   * Update codes status
   * Update the status of multiple individual codes and link them to a shift
   * @param requestBody
   * @returns any Codes status successfully updated
   * @throws ApiError
   */
  public static codeControllerUpdateCodesStatus(
    requestBody: UpdateCodesStatusDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/code/update-status",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Invalid input data format`,
        404: `Shift or individual codes not found`,
      },
    });
  }
}
