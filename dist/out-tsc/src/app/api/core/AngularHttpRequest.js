import { __decorate, __param } from "tslib";
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Inject, Injectable } from '@angular/core';
import { BaseHttpRequest } from './BaseHttpRequest';
import { OpenAPI } from './OpenAPI';
import { request as __request } from './request';
let AngularHttpRequest = class AngularHttpRequest extends BaseHttpRequest {
    constructor(config, http) {
        super(config, http);
    }
    /**
     * Request method
     * @param options The request options from the service
     * @returns Observable<T>
     * @throws ApiError
     */
    request(options) {
        return __request(this.config, this.http, options);
    }
};
AngularHttpRequest = __decorate([
    Injectable(),
    __param(0, Inject(OpenAPI))
], AngularHttpRequest);
export { AngularHttpRequest };
//# sourceMappingURL=AngularHttpRequest.js.map