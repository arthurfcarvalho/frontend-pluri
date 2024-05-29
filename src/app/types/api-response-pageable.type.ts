import { Pageable } from "./pageable.type";
import { Sort } from "./sort.type";

export type ApiResponsePageable = {
    content: any[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}