/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateProductDto = {
  id?:
    | string
    | {
        set?: string;
      };
  shortName?:
    | string
    | {
        set?: string;
      };
  fullName?:
    | string
    | {
        set?: string;
      };
  gtin?:
    | string
    | {
        set?: string;
      };
  alcoholCode?:
    | string
    | {
        set?: string;
      };
  expirationInDays?:
    | number
    | {
        set?: number;
        increment?: number;
        decrement?: number;
        multiply?: number;
        divide?: number;
      };
  volume?:
    | (
        | number
        | string
        | {
            d: Array<number>;
            e: number;
            s: number;
            toFixed: any;
          }
      )
    | {
        set?:
          | number
          | string
          | {
              d: Array<number>;
              e: number;
              s: number;
              toFixed: any;
            };
        increment?:
          | number
          | string
          | {
              d: Array<number>;
              e: number;
              s: number;
              toFixed: any;
            };
        decrement?:
          | number
          | string
          | {
              d: Array<number>;
              e: number;
              s: number;
              toFixed: any;
            };
        multiply?:
          | number
          | string
          | {
              d: Array<number>;
              e: number;
              s: number;
              toFixed: any;
            };
        divide?:
          | number
          | string
          | {
              d: Array<number>;
              e: number;
              s: number;
              toFixed: any;
            };
      };
  pictureUrl:
    | (
        | string
        | {
            set: string | null;
          }
      )
    | null;
  status?:
    | "ACTIVE"
    | "INACTIVE"
    | "PAUSED"
    | "REGISTRATION"
    | "ARCHIVED"
    | {
        set?: UpdateProductDto.set;
      };
  created?: {
    set?: any;
  };
  modified: {
    set: any;
  } | null;
};
export namespace UpdateProductDto {
  export enum set {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PAUSED = "PAUSED",
    REGISTRATION = "REGISTRATION",
    ARCHIVED = "ARCHIVED",
  }
}
