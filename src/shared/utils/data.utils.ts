import {Employee} from '../interface/employee.interface.ts';

export const getFilteredData = (fullData: Employee[], filterToSearchOn: string) => {
    return fullData.filter(employee =>
        Object.values(employee).some((value) => {
                return value.toString().toLowerCase().indexOf(filterToSearchOn.toLowerCase()) !== -1
            }
        ),
    );
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
