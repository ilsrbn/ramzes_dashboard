/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularHttpRequest } from './core/AngularHttpRequest';
import { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { OpenAPI } from './core/OpenAPI';

import { AdminAuthorizationService } from './services/AdminAuthorizationService';
import { AdminCategoryService } from './services/AdminCategoryService';
import { AdminPhotoService } from './services/AdminPhotoService';
import { AdminPostService } from './services/AdminPostService';
import { CategoryService } from './services/CategoryService';
import { PhotoService } from './services/PhotoService';
import { PostService } from './services/PostService';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        {
            provide: OpenAPI,
            useValue: {
                BASE: OpenAPI?.BASE ?? 'https://back.ramzes.serbin.co',
                VERSION: OpenAPI?.VERSION ?? '1',
                WITH_CREDENTIALS: OpenAPI?.WITH_CREDENTIALS ?? false,
                CREDENTIALS: OpenAPI?.CREDENTIALS ?? 'include',
                TOKEN: OpenAPI?.TOKEN,
                USERNAME: OpenAPI?.USERNAME,
                PASSWORD: OpenAPI?.PASSWORD,
                HEADERS: OpenAPI?.HEADERS,
                ENCODE_PATH: OpenAPI?.ENCODE_PATH,
            } as OpenAPIConfig,
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
export class ApiClient {}

