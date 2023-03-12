/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Account } from './Account';

export type Post = {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    title: string;
    content?: string;
    posted: any;
    owner: Account;
    ownerId: number;
    featured_photos: Array<string>;
};

