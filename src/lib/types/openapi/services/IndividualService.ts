/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WriteIndividualCodeDto } from "../models/WriteIndividualCodeDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class IndividualService {
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
}
