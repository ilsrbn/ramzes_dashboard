/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { Category } from '../models/Category';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class CategoryService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns Category
     * @throws ApiError
     */
    public categoryControllerFindAll(): Observable<Array<Category>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/category',
        });
    }

}
