/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { AccessTokenDto } from '../models/AccessTokenDto';
import type { Account } from '../models/Account';
// import type { CreateAccountDto } from '../models/CreateAccountDto';
import type { LoginDto } from '../models/LoginDto';

import { BaseHttpRequest } from '../core/BaseHttpRequest';

@Injectable()
export class AdminAuthorizationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    // /**
    //  * Register profile
    //  * @param requestBody
    //  * @returns Account
    //  * @throws ApiError
    //  */
    // public registerProfile(
    //     requestBody: CreateAccountDto,
    // ): Observable<Account> {
    //     return this.httpRequest.request({
    //         method: 'POST',
    //         url: '/api/admin/auth/register',
    //         body: requestBody,
    //         mediaType: 'application/json',
    //     });
    // }

    /**
     * login
     * @param requestBody
     * @returns AccessTokenDto
     * @throws ApiError
     */
    public login(
        requestBody: LoginDto,
    ): Observable<AccessTokenDto> {
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
