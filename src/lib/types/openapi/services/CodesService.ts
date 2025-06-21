/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxesCodeDataDto } from "../models/BoxesCodeDataDto";
import type { PackCodesDto } from "../models/PackCodesDto";
import type { PackedCodesResponseDto } from "../models/PackedCodesResponseDto";
import type { UpdateCodesStatusDto } from "../models/UpdateCodesStatusDto";
import type { WriteBoxesCodeDto } from "../models/WriteBoxesCodeDto";
import type { WriteIndividualCodeDto } from "../models/WriteIndividualCodeDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CodesService {
  /**
   * Create individual codes
   * Create new individual product codes and store them in the database with product association
   * @param requestBody
   * @returns any Codes successfully created and stored in database
   * @throws ApiError
   */
  public static codeControllerWriteIndividualCode(
    requestBody: WriteIndividualCodeDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/code/individual",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Invalid input format or validation error`,
      },
    });
  }
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
  /**
   * Download codes as text file
   * Download codes for a specific shift as a text file. Can include box codes if requested.
   * @param shiftId ID of the shift to download codes for
   * @param includeBoxes Whether to include box codes in the download
   * @returns string Text file with codes successfully generated
   * @throws ApiError
   */
  public static codeControllerDownloadCodes(
    shiftId: string,
    includeBoxes?: boolean,
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/code/download",
      query: {
        includeBoxes: includeBoxes,
        shiftId: shiftId,
      },
      errors: {
        400: `Invalid input data format`,
        404: `Shift not found`,
      },
    });
  }
}
