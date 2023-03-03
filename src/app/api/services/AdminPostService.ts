/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { CreatePostDto } from '../models/CreatePostDto';
import type { Post } from '../models/Post';
import type { UpdatePostDto } from '../models/UpdatePostDto';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class AdminPostService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create post
     * @param requestBody
     * @returns Post
     * @throws ApiError
     */
    public createPost(
        requestBody: CreatePostDto,
    ): Observable<Post> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/post',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

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
            url: '/api/admin/post',
            query: {
                'search': search,
            },
        });
    }

    /**
     * Edit post
     * @param id
     * @param requestBody
     * @returns Post
     * @throws ApiError
     */
    public editPost(
        id: string,
        requestBody: UpdatePostDto,
    ): Observable<Post> {
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
     * @param id
     * @returns any
     * @throws ApiError
     */
    public getPostById(
        id: string,
    ): Observable<any> {
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
     * @param id
     * @returns any
     * @throws ApiError
     */
    public deletePostById(
        id: string,
    ): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/admin/post/{id}',
            path: {
                'id': id,
            },
        });
    }

}
