import {useState} from 'react';
import {FetchDataParams} from '../interface/dataParams.interface.ts';
import {getFilteredData, sortData} from '../utils/data.utils.ts';
import {useSelector} from 'react-redux';
import {getEmployees} from '../../store/employees.selector.ts';


const useEmployeeData = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const fullData = useSelector(getEmployees);

    const getData = async (params: FetchDataParams) => {
        setLoading(true);
        try {
            let filteredData = fullData;
            if (params.filterToSearchOn) {
                filteredData = getFilteredData(fullData, params.filterToSearchOn);
            }
            filteredData = sortData(filteredData, params.order, params.orderBy);
            const start = params.currentPage * params.rowsPerPage;
            const end = start + params.rowsPerPage;
            const slicedData = filteredData.slice(start, end);
            return {employees: slicedData, totalCount: filteredData.length};
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return {loading, getData};
}


export default useEmployeeData;
