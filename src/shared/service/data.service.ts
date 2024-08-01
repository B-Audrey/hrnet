import mockData from '../../../mockData.json';
import {Employee} from '../interface/employee.interface.ts';
import {FetchDataParams} from '../interface/dataParams.interface.ts';

const fullData: Employee[] = mockData as unknown as Employee[];

export const fetchData = ({
                              filterToSearchOn,
                              order,
                              orderBy,
                              currentPage,
                              rowsPerPage
                          }: FetchDataParams): Employee[] => {
    let filteredData = getFilteredData(filterToSearchOn);

    filteredData = sortData(filteredData, order, orderBy);

    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
};

export const getFilteredData = (filterToSearchOn: string) => {
    return fullData.filter(employee =>
        Object.values(employee).some(
            value => value.toString().toLowerCase().indexOf(filterToSearchOn.toLowerCase()) !== -1,
        ),
    )
}

export const sortData = (filteredData: Employee[], order: 'asc' | 'desc', orderBy: keyof Employee) => {
    return filteredData.sort((a, b) => {
        if (a[orderBy]! < b[orderBy]!) {
            return order === 'asc' ? -1 : 1;
        }
        if (a[orderBy]! > b[orderBy]!) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
}

export const getTotalOfAvailableDataCount = (filterToSearchOn: string): number => {
    return getFilteredData(filterToSearchOn).length;
};
