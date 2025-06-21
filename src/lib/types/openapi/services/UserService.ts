/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from "../models/CreateUserDto";
import type { IUserFindMany } from "../models/IUserFindMany";
import type { IUserFindOne } from "../models/IUserFindOne";
import type { ResetPasswordDto } from "../models/ResetPasswordDto";
import type { ResetPasswordRequestDto } from "../models/ResetPasswordRequestDto";
import type { SignInDto } from "../models/SignInDto";
import type { UpdateUserDto } from "../models/UpdateUserDto";
import type { UserLoginResponse } from "../models/UserLoginResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UserService {
  /**
   * Create user
   * Register a new user in the system with email and password
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
   * Find all users
   * Get paginated list of all registered users in the system
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
   * Find user by ID
   * Get detailed information about a specific user by their ID
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
   * Update user
   * Update user information such as name, email, or other profile data
   * @param id
   * @param requestBody
   * @returns IUserFindOne User successfully updated
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
   * Delete user
   * Remove a user from the system
   * @param id
   * @returns any User successfully deleted
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
   * Sign in user
   * Authenticate user with email and password and return JWT token
   * @param requestBody
   * @returns UserLoginResponse User successfully signed in, JWT token set in cookies
   * @throws ApiError
   */
  public static userControllerSignIn(
    requestBody: SignInDto,
  ): CancelablePromise<UserLoginResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/auth/sign-in",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        401: `Invalid credentials`,
      },
    });
  }
  /**
   * Reset password request
   * Request a password reset by providing an email, sends reset link to user email
   * @param requestBody
   * @returns any Reset password request processed successfully
   * @throws ApiError
   */
  public static userControllerResetRequest(
    requestBody: ResetPasswordRequestDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/auth/reset-password-request",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `User can't be found or something went wrong`,
      },
    });
  }
  /**
   * Reset password
   * Reset user password using token received via email
   * @param requestBody
   * @returns any Password has been successfully reset
   * @throws ApiError
   */
  public static userControllerResetPasswordAfterRequest(
    requestBody: ResetPasswordDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/auth/reset-password",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `Something went wrong`,
      },
    });
  }
  /**
   * Revoke token
   * Revoke the current JWT token (logout)
   * @returns any Token successfully revoked
   * @throws ApiError
   */
  public static userControllerRevokeToken(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/auth/revoke-token",
      errors: {
        400: `Token ID (jti) is missing`,
      },
    });
  }
  /**
   * Get current user
   * Get details of the currently authenticated user
   * @returns IUserFindOne Returns current user information
   * @throws ApiError
   */
  public static userControllerGetMe(): CancelablePromise<IUserFindOne> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/auth/me",
      errors: {
        400: `User ID (sub) is missing`,
      },
    });
  }
}
