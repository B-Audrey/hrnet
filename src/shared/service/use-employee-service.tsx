import {useStore} from 'react-redux';
import {Employee} from '../interface/employee.ts';

export default function useEmployeeService() {
    const store = useStore();
    const addEmployee = (employee: Employee) => {
        return store.dispatch({type: 'ADD_EMPLOYEE', payload: employee});
    };
    return {addEmployee}
}
