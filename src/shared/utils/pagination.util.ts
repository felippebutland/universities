interface PaginationResult<T> {
    page: number;
    limit: number;
    totalCount: number;
}

function paginate<T>(array: T[], page: number, limit: number): PaginationResult<T> {

    return {
        page: page * limit,
        limit: (page - 1) * limit,
        totalCount: array.length,
    };
}

export { PaginationResult, paginate };