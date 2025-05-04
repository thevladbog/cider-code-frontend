/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxesCodeDataDto } from "../models/BoxesCodeDataDto";
import type { IndividualCodeDataDto } from "../models/IndividualCodeDataDto";
import type { WriteBoxesCodeDto } from "../models/WriteBoxesCodeDto";
import type { WriteIndividualCodeDto } from "../models/WriteIndividualCodeDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CodeService {
  /**
   * @param requestBody
   * @returns IndividualCodeDataDto Code successfully created
   * @throws ApiError
   */
  public static codeControllerWriteIndividualCode(
    requestBody: WriteIndividualCodeDto,
  ): CancelablePromise<IndividualCodeDataDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/code/individual",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
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
    });
  }
}
