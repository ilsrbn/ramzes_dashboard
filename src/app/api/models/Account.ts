/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Post } from './Post';

export type Account = {
    id: number;
    username: string;
    password: string;
    posts: Array<Post>;
};

