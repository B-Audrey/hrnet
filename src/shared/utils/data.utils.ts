import {Employee} from '../interface/employee.interface.ts';

/**
 * Filters the data based on the filterToSearchOn
 * Search in every values of the object, if the object contains the filterToSearchOn value
 * If the value is not found it will send a -1 index value so we check if it is different from -1
 * @param fullData
 * @param filterToSearchOn
 */
export const getFilteredData = (fullData: Employee[], filterToSearchOn: string) => {
    return fullData.filter(employee =>
        Object.values(employee).some((value) => {
                return value.toString().toLowerCase().indexOf(filterToSearchOn.toLowerCase()) !== -1
            }
        ),
    );
}

/**
 * Sorts the data based on the order and orderBy
 * @param filteredData
 * @param order
 * @param orderBy
 */
export const sortData = (filteredData: Employee[], order: 'asc' | 'desc', orderBy: keyof Employee) => {
    //@ts-expect-error - toSorted is not yet understood
    return filteredData.toSorted((a, b) => { //use toSorted instead of sort to do not mutate array

        //if it is a string, we convert it to lowercase to make the comparison case insensitive, else value doesnt change
        const aValue = typeof a[orderBy] === 'string' ? (a[orderBy] as string).toLowerCase() : a[orderBy];
        const bValue = typeof b[orderBy] === 'string' ? (b[orderBy] as string).toLowerCase() : b[orderBy];

        if (aValue! < bValue!) {
            return order === 'asc' ? -1 : 1;
        }
        if (aValue! > bValue!) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
}
