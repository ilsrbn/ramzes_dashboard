/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { CreatePostDto } from '../models/CreatePostDto';
import type { PaginatedResponseLinksDto } from '../models/PaginatedResponseLinksDto';
import type { PaginatedResponseMetaDto } from '../models/PaginatedResponseMetaDto';
import type { Post } from '../models/Post';
import type { UpdatePostDto } from '../models/UpdatePostDto';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class AdminPostService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Toggle post visibility
     * @returns Post
     * @throws ApiError
     */
    public togglePostVisibility({
        id,
    }: {
        id: string,
    }): Observable<Post> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/post/toggle/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Create post
     * @returns Post
     * @throws ApiError
     */
    public createPost({
        requestBody,
    }: {
        requestBody: CreatePostDto,
    }): Observable<Post> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/post',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

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
            url: '/api/admin/post',
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
     * Edit post
     * @returns Post
     * @throws ApiError
     */
    public editPost({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdatePostDto,
    }): Observable<Post> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/admin/post/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
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
            url: '/api/admin/post/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Delete post by ID
     * @returns any
     * @throws ApiError
     */
    public deletePostById({
        id,
    }: {
        id: string,
    }): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/admin/post/{id}',
            path: {
                'id': id,
            },
        });
    }

}
