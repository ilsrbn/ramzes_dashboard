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
     * @param search Search by post title and content
     * @returns Post
     * @throws ApiError
     */
    public getAllPosts(
        search?: string,
    ): Observable<Array<Post>> {
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
     * @param id
     * @returns any
     * @throws ApiError
     */
    public getPostById(
        id: string,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/post/{id}',
            path: {
                'id': id,
            },
        });
    }

}
