/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from "../models/CreateUserDto";
import type { IUserFindMany } from "../models/IUserFindMany";
import type { IUserFindOne } from "../models/IUserFindOne";
import type { SignInDto } from "../models/SignInDto";
import type { UpdateUserDto } from "../models/UpdateUserDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UserService {
  /**
   * @param requestBody
   * @returns IUserFindOne User successfully created
   * @throws ApiError
   */
  public static userControllerCreate(
    requestBody: CreateUserDto,
  ): CancelablePromise<IUserFindOne> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user",
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
   * @returns IUserFindMany Returns a list of users
   * @throws ApiError
   */
  public static userControllerFindAll(
    page?: number,
    limit?: number,
  ): CancelablePromise<IUserFindMany> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user",
      query: {
        page: page,
        limit: limit,
      },
    });
  }
  /**
   * @param id
   * @returns IUserFindOne Returns the requested user
   * @throws ApiError
   */
  public static userControllerFindOne(
    id: string,
  ): CancelablePromise<IUserFindOne> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/{id}",
      path: {
        id: id,
      },
      errors: {
        404: `User can't be found or something went wrong`,
      },
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns IUserFindOne
   * @throws ApiError
   */
  public static userControllerUpdate(
    id: string,
    requestBody: UpdateUserDto,
  ): CancelablePromise<IUserFindOne> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/user/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `User can't be found or something went wrong`,
      },
    });
  }
  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static userControllerRemove(id: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/user/{id}",
      path: {
        id: id,
      },
      errors: {
        404: `User can't be found or something went wrong`,
      },
    });
  }
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static userControllerSignIn(
    requestBody: SignInDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/auth/sign-in",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static userControllerRevokeToken(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/auth/revoke-token",
    });
  }
  /**
   * @returns IUserFindOne
   * @throws ApiError
   */
  public static userControllerGetMe(): CancelablePromise<IUserFindOne> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/auth/me",
    });
  }
}
