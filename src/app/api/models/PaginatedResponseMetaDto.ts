/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PaginatedResponseMetaDto = {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: Array<string>;
    searchBy: Array<string>;
    search: string;
    filter?: any;
};

