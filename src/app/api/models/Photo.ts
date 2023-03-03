/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';

export type Photo = {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    file_url: string;
    file: string;
    categories: Array<Category>;
    posted: any;
};

