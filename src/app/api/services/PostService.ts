/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { Post } from '../models/Post';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class PostService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all posts
     * @returns Post
     * @throws ApiError
     */
    public getAllPosts({
        search,
    }: {
        /**
         * Search by post title and content
         */
        search?: string,
    }): Observable<Array<Post>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/post',
            query: {
                'search': search,
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
