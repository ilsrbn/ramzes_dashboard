/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { PaginatedResponseDto } from '../models/PaginatedResponseDto';
import type { Photo } from '../models/Photo';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class AdminPhotoService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create optimized .webp photo
     * @param formData
     * @returns any
     * @throws ApiError
     */
    public createOptimizedWebpPhoto(
        formData: {
            file?: Blob;
        },
    ): Observable<any> {
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
    public getAllPhotos(
        page?: any,
        limit?: any,
        search?: any,
        searchBy?: Array<string>,
        sortBy?: any,
    ): Observable<PaginatedResponseDto<Photo>> {
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
    public deletePhotoById(
        id: string,
    ): Observable<any> {
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
    public getPhotoById(
        id: string,
    ): Observable<any> {
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
    public togglePhotoPublicationStatus(
        id: string,
    ): Observable<Photo> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/photo/{id}',
            path: {
                'id': id,
            },
        });
    }

}
