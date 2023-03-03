/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Account } from './Account';
import type { Photo } from './Photo';

export type Category = {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    title: string;
    description?: string;
    owner: Account;
    ownerId: number;
    photos: Array<Photo>;
    posted: any;
    cover: Photo;
};

