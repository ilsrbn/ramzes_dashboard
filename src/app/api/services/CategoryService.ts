/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { Category } from '../models/Category';
import type { PaginatedResponseLinksDto } from '../models/PaginatedResponseLinksDto';
import type { PaginatedResponseMetaDto } from '../models/PaginatedResponseMetaDto';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class CategoryService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all posted categories
     * @returns any
     * @throws ApiError
     */
    public getAllPostedCategories({
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
        data?: Array<Category>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/category',
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
     * Get posted category by ID
     * @returns any
     * @throws ApiError
     */
    public getPostedCategoryById({
        id,
        page,
        limit,
        search,
        searchBy,
        sortBy,
    }: {
        id: string,
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
        data?: Array<Category>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/category/{id}',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'limit': limit,
                'search': search,
                'searchBy': searchBy,
                'sortBy': sortBy,
            },
        });
    }

}
