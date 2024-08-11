import {useStore} from 'react-redux';
import {Employee} from '../interface/employee.interface.ts';

/**
 * This hook is used to add an employee to the store
 */
export default function useEmployeeStore() {
    const store = useStore();
    const addEmployee = (employee: Employee) => {
        const addData =  store.dispatch({
            type: 'ADD_EMPLOYEE',
            payload: {...employee}
        });
        console.log('addData', addData);
    };
    return {addEmployee};
}
