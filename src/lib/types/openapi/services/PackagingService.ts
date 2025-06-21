/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PackCodesDto } from "../models/PackCodesDto";
import type { PackedCodesResponseDto } from "../models/PackedCodesResponseDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class PackagingService {
  /**
   * Pack codes
   * Pack individual codes into a box and generate a new SSCC code
   * @param requestBody
   * @returns PackedCodesResponseDto Codes successfully packed and new SSCC code created
   * @throws ApiError
   */
  public static codeControllerPackCodes(
    requestBody: PackCodesDto,
  ): CancelablePromise<PackedCodesResponseDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/code/pack",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Invalid input data format`,
        404: `Box code or individual codes not found`,
      },
    });
  }
}
