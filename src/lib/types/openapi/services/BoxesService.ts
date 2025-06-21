/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxesCodeDataDto } from "../models/BoxesCodeDataDto";
import type { WriteBoxesCodeDto } from "../models/WriteBoxesCodeDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class BoxesService {
  /**
   * Generate SSCC code
   * Generate next SSCC code for boxes and store it in the database
   * @param requestBody
   * @returns BoxesCodeDataDto Code successfully created
   * @throws ApiError
   */
  public static codeControllerGetNextSscc(
    requestBody: WriteBoxesCodeDto,
  ): CancelablePromise<BoxesCodeDataDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/code/boxes",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Invalid input data or SSCC format`,
        404: `No previous SSCC codes found in database`,
      },
    });
  }
}
