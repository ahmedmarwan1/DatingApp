export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalitems: number;
    totalPages: number;
}

export class PagintedResult<T> {
    result: T;
    pagination: Pagination;
}
