import { __decorate } from "tslib";
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
let CategoryService = class CategoryService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * @returns Category
     * @throws ApiError
     */
    categoryControllerFindAll() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/category',
        });
    }
};
CategoryService = __decorate([
    Injectable()
], CategoryService);
export { CategoryService };
//# sourceMappingURL=CategoryService.js.map