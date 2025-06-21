/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedProductId } from "../models/CreatedProductId";
import type { CreateProductDto } from "../models/CreateProductDto";
import type { IProductFindMany } from "../models/IProductFindMany";
import type { SelectProductDto } from "../models/SelectProductDto";
import type { UpdateProductDto } from "../models/UpdateProductDto";
import type { UpdateProductStatusDto } from "../models/UpdateProductStatusDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ProductService {
  /**
   * Create product
   * Create a new product with all required details
   * @param requestBody Json structure for product object
   * @returns CreatedProductId The record has been successfully created.
   * @throws ApiError
   */
  public static productControllerCreate(
    requestBody: CreateProductDto,
  ): CancelablePromise<CreatedProductId> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/product",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `Forbidden.`,
      },
    });
  }
  /**
   * Get all products
   * Retrieve a paginated list of all products with optional search capabilities
   * @param page Page number
   * @param limit Items per page
   * @param search Search string
   * @returns IProductFindMany
   * @throws ApiError
   */
  public static productControllerFindAll(
    page?: number,
    limit?: number,
    search?: string,
  ): CancelablePromise<IProductFindMany> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/product",
      query: {
        page: page,
        limit: limit,
        search: search,
      },
      errors: {
        403: `Forbidden.`,
      },
    });
  }
  /**
   * Get product by ID
   * Retrieve detailed information about a specific product by its ID
   * @param id
   * @returns SelectProductDto
   * @throws ApiError
   */
  public static productControllerFindOne(
    id: string,
  ): CancelablePromise<SelectProductDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/product/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden.`,
        404: `Product not found.`,
      },
    });
  }
  /**
   * Update product
   * Update an existing product information such as name, GTIN, alcohol code, etc.
   * @param id
   * @param requestBody Json structure for product object
   * @returns UpdateProductDto
   * @throws ApiError
   */
  public static productControllerUpdate(
    id: string,
    requestBody: UpdateProductDto,
  ): CancelablePromise<UpdateProductDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/product/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `Forbidden.`,
        404: `Product not found.`,
      },
    });
  }
  /**
   * Delete product
   * Remove a product from the system
   * @param id
   * @returns any Product successfully deleted
   * @throws ApiError
   */
  public static productControllerRemove(id: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/product/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden.`,
        404: `Product not found.`,
      },
    });
  }
  /**
   * Update product status
   * Change product status (ACTIVE, INACTIVE, PAUSED, etc.)
   * @param id
   * @param requestBody Json structure for product status
   * @returns UpdateProductDto Product status successfully updated
   * @throws ApiError
   */
  public static productControllerUpdateStatus(
    id: string,
    requestBody: UpdateProductStatusDto,
  ): CancelablePromise<UpdateProductDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/product/{id}/status",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `Forbidden.`,
        404: `Product not found.`,
      },
    });
  }
  /**
   * Search products
   * Search for products by name, GTIN, alcohol code or other attributes
   * @param search
   * @returns SelectProductDto
   * @throws ApiError
   */
  public static productControllerSearch(
    search: string,
  ): CancelablePromise<Array<SelectProductDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/product/search",
      query: {
        search: search,
      },
      errors: {
        403: `Forbidden.`,
      },
    });
  }
}
