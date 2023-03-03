/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { AttachPhotosDto } from '../models/AttachPhotosDto';
import type { Category } from '../models/Category';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class AdminCategoryService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns Category
     * @throws ApiError
     */
    public adminCategoryControllerFindAll(): Observable<Array<Category>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/category',
        });
    }

    /**
     * @param id
     * @returns Category
     * @throws ApiError
     */
    public adminCategoryControllerFindOne(
        id: string,
    ): Observable<Category> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/category/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns Category
     * @throws ApiError
     */
    public adminCategoryControllerAttachPhotos(
        id: string,
        requestBody: AttachPhotosDto,
    ): Observable<Category> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/category/{id}/photos/attach',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns Category
     * @throws ApiError
     */
    public adminCategoryControllerDetachPhotos(
        id: string,
        requestBody: AttachPhotosDto,
    ): Observable<Category> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/category/{id}/photos/detach',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
