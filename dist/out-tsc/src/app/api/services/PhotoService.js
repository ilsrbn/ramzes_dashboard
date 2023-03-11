import { __decorate } from "tslib";
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
let PhotoService = class PhotoService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Get all posted photos
     * @param page Page number (starting from 1)
     * @param limit Number of records per page
     * @param search Multicolumn search term
     * @param searchBy Limit columns to which apply 'search' term
     * @param sortBy Format: _field_:_direction_ [direction may be ASC or DESC] e.g. id:DESC
     * @returns any Returns paginated photos
     * @throws ApiError
     */
    getAllPostedPhotos(page, limit, search, searchBy, sortBy) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/photo',
            query: {
                'page': page,
                'limit': limit,
                'search': search,
                'searchBy': searchBy,
                'sortBy': sortBy,
            },
        });
    }
    /**
     * Get posted photo by ID
     * @param id
     * @returns any
     * @throws ApiError
     */
    getPostedPhotoById(id) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/photo/{id}',
            path: {
                'id': id,
            },
        });
    }
};
PhotoService = __decorate([
    Injectable()
], PhotoService);
export { PhotoService };
//# sourceMappingURL=PhotoService.js.map