/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { PaginatedResponseLinksDto } from '../models/PaginatedResponseLinksDto';
import type { PaginatedResponseMetaDto } from '../models/PaginatedResponseMetaDto';
import type { Photo } from '../models/Photo';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class AdminPhotoService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create optimized .webp photo
     * @returns any
     * @throws ApiError
     */
    public createOptimizedWebpPhoto({
        formData,
    }: {
        formData: {
            file?: Blob;
        },
    }): Observable<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/photo',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Get all photos
     * @returns any
     * @throws ApiError
     */
    public getAllPhotos({
        page,
        limit,
        search,
        searchBy,
        sortBy,
    }: {
        /**
         * Page number (starting from 1)
         */
        page?: any,
        /**
         * Number of records per page
         */
        limit?: any,
        /**
         * Multicolumn search term
         */
        search?: any,
        /**
         * Limit columns to which apply 'search' term
         */
        searchBy?: Array<string>,
        /**
         * Format: _field_:_direction_ [direction may be ASC or DESC] e.g. id:DESC
         */
        sortBy?: any,
    }): Observable<{
        links?: PaginatedResponseLinksDto;
        meta?: PaginatedResponseMetaDto;
        data?: Array<Photo>;
    }> {
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
     * @returns any
     * @throws ApiError
     */
    public deletePhotoById({
        id,
    }: {
        id: string,
    }): Observable<any> {
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
     * @returns any
     * @throws ApiError
     */
    public getPhotoById({
        id,
    }: {
        id: string,
    }): Observable<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/photo/{id}',
            path: {
                'id': id,
            },
        });
    }

}
