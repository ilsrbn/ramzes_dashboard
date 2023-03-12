/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { AccessTokenDto } from '../models/AccessTokenDto';
import type { Account } from '../models/Account';
import type { LoginDto } from '../models/LoginDto';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class AdminAuthorizationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * login
     * @returns AccessTokenDto
     * @throws ApiError
     */
    public login({
        requestBody,
    }: {
        requestBody: LoginDto,
    }): Observable<AccessTokenDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get logged in profile
     * @returns Account
     * @throws ApiError
     */
    public getLoggedInProfile(): Observable<Account> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/auth/profile',
        });
    }

}
