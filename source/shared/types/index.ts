export type TValueOf<T> = T[keyof T]

export enum ECompanies {FLS = 'FirstLineSoftware', FK = 'FormatKoda'}

export const EHosts = {
    LOCAL: {
        url: 'local.iceberg.ru',
        api: 'https://local.iceberg.core.ru'
    },
    DEV: {
        url: 'icebergdev.domain.corp',
        api: 'https://icebergdev.core.domain.corp'
    },
    TEST_FK: {
        url: 'icebergtest.formatkoda.ru',
        api: 'https://icebergtest-core.formatkoda.ru'
    },
    TEST_FLS: {
        url: 'icebergtest.firstlinesoftware.com',
        api: 'https://icebergtest-core.firstlinesoftware.com'
    },
    PROD_FK: {
        url: 'iceberg.formatkoda.ru',
        api: 'https://iceberg-core.formatkoda.ru'
    },
    PROD_FLS: {
        url: 'https://iceberg.firstlinesoftware.com',
        api: 'https://iceberg-core.firstlinesoftware.com'
    }
}

export enum EServerRequestMethods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum EServerRequestTypes {
    FROM_SERVICE = 'fromService',
    FROM_API = 'fromApi'
}

export enum EApiRequestResults {
    SUCCESS,
    BUSINESS_ERROR,
    MODEL_VALIDATION_ERROR,
    ENTITY_NOT_FOUND,
    SERVER_ERROR
}

export interface IApiResponse {
    RequestResult?: EApiRequestResults
    Message?: string
    Data? : unknown
}

export interface IServiceResponse {
    d?: {
        IsSucceeded?: boolean
        Message?: string
        Value? : unknown
    }
}

export interface IResponse<T> {
    IsSucceeded: boolean
    Message?: string
    Value? : T
}

export interface IServerResponse {
    d?: IResponse<unknown>
}

export interface IRequestFromServerOptions {
    url: string,
    method?: EServerRequestMethods,
    params?: Record<string, unknown>,
    data?: Record<string, unknown> | unknown[]
 | null}

export interface IPopupResultEvent extends CustomEvent {
    detail: IPopupResultEventDetail
}

export interface IPopupResultEventDetail {
    IsSucceeded: boolean
}

export interface IEntityItem {
    Id: number
    Name: string
    IsActive?: boolean
}

export enum ECRUDModes {
    CREATE = 'Create',
    READ = 'Read',
    UPDATE = 'Update',
    DELETE = 'Delete'
}

export interface ISvgParams {
    width: number,
    height: number
}

export const MODE_PARAM_NAME = 'mode'

export interface ISizes {
    width: number,
    height: number
}
