import { __decorate } from "tslib";
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
let AdminPostService = class AdminPostService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * Create post
     * @param requestBody
     * @returns Post
     * @throws ApiError
     */
    createPost(requestBody) {
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
    getAllPosts(search) {
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
    editPost(id, requestBody) {
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
    getPostById(id) {
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
    deletePostById(id) {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/admin/post/{id}',
            path: {
                'id': id,
            },
        });
    }
};
AdminPostService = __decorate([
    Injectable()
], AdminPostService);
export { AdminPostService };
//# sourceMappingURL=AdminPostService.js.map