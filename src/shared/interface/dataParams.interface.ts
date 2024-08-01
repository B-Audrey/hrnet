import {Employee} from './employee.interface.ts';

export interface FetchDataParams {
    filterToSearchOn: string;
    order: 'asc' | 'desc';
    orderBy: keyof Employee;
    currentPage: number;
    rowsPerPage: number;
}

export interface DataTableProps {
    data: Employee[];
    order: 'asc' | 'desc';
    orderBy: keyof Employee;
    handleRequestSort: (propertyToOrderBy: keyof Employee) => void;
    headCells: { id: keyof Employee; label: string }[];
}
