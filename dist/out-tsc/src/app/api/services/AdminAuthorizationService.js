import { __decorate } from "tslib";
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
let AdminAuthorizationService = class AdminAuthorizationService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    /**
     * login
     * @param requestBody
     * @returns AccessTokenDto
     * @throws ApiError
     */
    login(requestBody) {
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
    getLoggedInProfile() {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/auth/profile',
        });
    }
};
AdminAuthorizationService = __decorate([
    Injectable()
], AdminAuthorizationService);
export { AdminAuthorizationService };
//# sourceMappingURL=AdminAuthorizationService.js.map