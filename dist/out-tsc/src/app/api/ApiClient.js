var _a, _b, _c, _d;
import { __decorate } from "tslib";
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularHttpRequest } from './core/AngularHttpRequest';
import { BaseHttpRequest } from './core/BaseHttpRequest';
import { OpenAPI } from './core/OpenAPI';
import { AdminAuthorizationService } from './services/AdminAuthorizationService';
import { AdminCategoryService } from './services/AdminCategoryService';
import { AdminPhotoService } from './services/AdminPhotoService';
import { AdminPostService } from './services/AdminPostService';
import { CategoryService } from './services/CategoryService';
import { PhotoService } from './services/PhotoService';
import { PostService } from './services/PostService';
let ApiClient = class ApiClient {
};
ApiClient = __decorate([
    NgModule({
        imports: [HttpClientModule],
        providers: [
            {
                provide: OpenAPI,
                useValue: {
                    BASE: (_a = OpenAPI === null || OpenAPI === void 0 ? void 0 : OpenAPI.BASE) !== null && _a !== void 0 ? _a : 'http://localhost:3005',
                    VERSION: (_b = OpenAPI === null || OpenAPI === void 0 ? void 0 : OpenAPI.VERSION) !== null && _b !== void 0 ? _b : '1',
                    WITH_CREDENTIALS: (_c = OpenAPI === null || OpenAPI === void 0 ? void 0 : OpenAPI.WITH_CREDENTIALS) !== null && _c !== void 0 ? _c : false,
                    CREDENTIALS: (_d = OpenAPI === null || OpenAPI === void 0 ? void 0 : OpenAPI.CREDENTIALS) !== null && _d !== void 0 ? _d : 'include',
                    TOKEN: OpenAPI === null || OpenAPI === void 0 ? void 0 : OpenAPI.TOKEN,
                    USERNAME: OpenAPI === null || OpenAPI === void 0 ? void 0 : OpenAPI.USERNAME,
                    PASSWORD: OpenAPI === null || OpenAPI === void 0 ? void 0 : OpenAPI.PASSWORD,
                    HEADERS: OpenAPI === null || OpenAPI === void 0 ? void 0 : OpenAPI.HEADERS,
                    ENCODE_PATH: OpenAPI === null || OpenAPI === void 0 ? void 0 : OpenAPI.ENCODE_PATH,
                },
            },
            {
                provide: BaseHttpRequest,
                useClass: AngularHttpRequest,
            },
            AdminAuthorizationService,
            AdminCategoryService,
            AdminPhotoService,
            AdminPostService,
            CategoryService,
            PhotoService,
            PostService,
        ]
    })
], ApiClient);
export { ApiClient };
//# sourceMappingURL=ApiClient.js.map