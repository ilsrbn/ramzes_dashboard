/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { AttachPhotosDto } from '../models/AttachPhotosDto';
import type { Category } from '../models/Category';
import type { CreateCategoryDto } from '../models/CreateCategoryDto';
import type { EditCategoryDto } from '../models/EditCategoryDto';
import type { PaginatedResponseLinksDto } from '../models/PaginatedResponseLinksDto';
import type { PaginatedResponseMetaDto } from '../models/PaginatedResponseMetaDto';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class AdminCategoryService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all categories
     * @returns any
     * @throws ApiError
     */
    public getAllCategories({
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
            url: '/api/admin/category',
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
     * Create category
     * @returns Category
     * @throws ApiError
     */
    public createCategory({
        requestBody,
    }: {
        requestBody: CreateCategoryDto,
    }): Observable<Category> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/category',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get category by ID
     * @returns Category
     * @throws ApiError
     */
    public getCategoryById({
        id,
    }: {
        id: string,
    }): Observable<Category> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/category/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Edit Category by ID
     * @returns Category
     * @throws ApiError
     */
    public editCategoryById({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: EditCategoryDto,
    }): Observable<Category> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/admin/category/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete category
     * @returns any
     * @throws ApiError
     */
    public deleteCategory({
        id,
    }: {
        id: string,
    }): Observable<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/admin/category/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Attach photos to category
     * @returns Category
     * @throws ApiError
     */
    public attachPhotosToCategory({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: AttachPhotosDto,
    }): Observable<Category> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/category/photos/attach/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Detach photos from category
     * @returns Category
     * @throws ApiError
     */
    public detachPhotosFromCategory({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: AttachPhotosDto,
    }): Observable<Category> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/category/photos/detach/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Set cover
     * @returns Category
     * @throws ApiError
     */
    public setCover({
        categoryId,
        photoId,
    }: {
        categoryId: string,
        photoId: string,
    }): Observable<Category> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/category/cover/{categoryId}',
            path: {
                'categoryId': categoryId,
            },
            query: {
                'photoId': photoId,
            },
        });
    }

    /**
     * Toggle posted Status
     * @returns Category
     * @throws ApiError
     */
    public togglePostedStatus({
        categoryId,
    }: {
        categoryId: string,
    }): Observable<Category> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/category/status/{categoryId}',
            path: {
                'categoryId': categoryId,
            },
        });
    }

}
