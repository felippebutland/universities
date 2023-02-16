interface PaginationResult<T> {
    results: T[];
    page: number;
    limit: number;
    totalCount: number;
}

function paginate<T>(array: T, page: number, limit: number): PaginationResult<T> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = array.slice(startIndex, endIndex);

    return {
        results,
        page,
        limit,
        totalCount: array.length,
    };
}

export { PaginationResult, paginate };