import { __decorate } from "tslib";
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
let AdminPhotoService = class AdminPhotoService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Create optimized .webp photo
     * @param formData
     * @returns any
     * @throws ApiError
     */
    createOptimizedWebpPhoto(formData) {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/photo',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Get all photos
     * @param page Page number (starting from 1)
     * @param limit Number of records per page
     * @param search Multicolumn search term
     * @param searchBy Limit columns to which apply 'search' term
     * @param sortBy Format: _field_:_direction_ [direction may be ASC or DESC] e.g. id:DESC
     * @returns any
     * @throws ApiError
     */
    getAllPhotos(page, limit, search, searchBy, sortBy) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/photo',
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
     * Delete photo by ID
     * @param id
     * @returns any
     * @throws ApiError
     */
    deletePhotoById(id) {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/admin/photo/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get photo by ID
     * @param id
     * @returns any
     * @throws ApiError
     */
    getPhotoById(id) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/photo/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Toggle photo publication status
     * @param id
     * @returns Photo
     * @throws ApiError
     */
    togglePhotoPublicationStatus(id) {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/photo/{id}',
            path: {
                'id': id,
            },
        });
    }
};
AdminPhotoService = __decorate([
    Injectable()
], AdminPhotoService);
export { AdminPhotoService };
//# sourceMappingURL=AdminPhotoService.js.map