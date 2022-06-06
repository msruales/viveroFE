import {Pagination} from "../models/pagination.model";

export const paginationAdapter = (pagination: any):Pagination => ({
    total: pagination.total,
    currentPage: pagination.current_page,
    perPage: pagination.per_page,
    lastPage: pagination.last_page || 1,
    from: pagination.from,
    to: pagination.to
})
