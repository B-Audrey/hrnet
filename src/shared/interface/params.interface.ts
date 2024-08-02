import {Employee} from './employee.interface.ts';

export interface FetchDataParams {
    filterToSearchOn: string;
    order: 'asc' | 'desc';
    orderBy: keyof Employee;
    currentPage: number;
    rowsPerPage: number;
}
