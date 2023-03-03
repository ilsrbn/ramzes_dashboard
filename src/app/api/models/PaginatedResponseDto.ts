/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginatedResponseLinksDto } from './PaginatedResponseLinksDto';
import type { PaginatedResponseMetaDto } from './PaginatedResponseMetaDto';

export type PaginatedResponseDto<T> = {
    meta: PaginatedResponseMetaDto;
    links: PaginatedResponseLinksDto;
    data: T[]
};

