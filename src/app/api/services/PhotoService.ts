/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { Photo } from '../models/Photo';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class PhotoService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all posted photos
     * @returns any Returns paginated photos
     * @throws ApiError
     */
    public getAllPostedPhotos({
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
        data?: Array<Photo>;
        meta?: {
            itemsPerPage?: number;
            totalItems?: number;
            currentPage?: number;
            totalPages?: number;
            search?: string;
        };
        links?: {
            first?: string;
            previous?: string;
            current?: string;
            next?: string;
            last?: string;
        };
    }> {
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
     * @returns any
     * @throws ApiError
     */
    public getPostedPhotoById({
        id,
    }: {
        id: string,
    }): Observable<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/photo/{id}',
            path: {
                'id': id,
            },
        });
    }

}
