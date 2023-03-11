import { __decorate } from "tslib";
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
let AdminCategoryService = class AdminCategoryService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * @returns Category
     * @throws ApiError
     */
    adminCategoryControllerFindAll() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/category',
        });
    }
    /**
     * @param id
     * @returns Category
     * @throws ApiError
     */
    adminCategoryControllerFindOne(id) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/category/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Category
     * @throws ApiError
     */
    adminCategoryControllerAttachPhotos(id, requestBody) {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/category/{id}/photos/attach',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Category
     * @throws ApiError
     */
    adminCategoryControllerDetachPhotos(id, requestBody) {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/category/{id}/photos/detach',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
};
AdminCategoryService = __decorate([
    Injectable()
], AdminCategoryService);
export { AdminCategoryService };
//# sourceMappingURL=AdminCategoryService.js.map