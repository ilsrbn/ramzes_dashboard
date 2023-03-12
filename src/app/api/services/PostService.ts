/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { PaginatedResponseLinksDto } from '../models/PaginatedResponseLinksDto';
import type { PaginatedResponseMetaDto } from '../models/PaginatedResponseMetaDto';
import type { Post } from '../models/Post';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class PostService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all posts
     * @returns any
     * @throws ApiError
     */
    public getAllPosts({
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
        data?: Array<Post>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/post',
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
     * Get post by ID
     * @returns Post
     * @throws ApiError
     */
    public getPostById({
        id,
    }: {
        id: string,
    }): Observable<Post> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/post/{id}',
            path: {
                'id': id,
            },
        });
    }

}
