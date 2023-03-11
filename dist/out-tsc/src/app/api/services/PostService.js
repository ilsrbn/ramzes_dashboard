import { __decorate } from "tslib";
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
let PostService = class PostService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
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
    getPostById(id) {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/post/{id}',
            path: {
                'id': id,
            },
        });
    }
};
PostService = __decorate([
    Injectable()
], PostService);
export { PostService };
//# sourceMappingURL=PostService.js.map