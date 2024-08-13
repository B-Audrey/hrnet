import { useStore } from 'react-redux';
import { Employee } from '../interface/employee.interface.ts';

/**
 * This hook is used to add an employee to the store
 */
export default function useEmployeeStore() {
  const store = useStore();
  const addEmployee = (employee: Employee) => {
    const uniqueValue = new Date().getTime().toString();
    const uniqueEmployee = { ...employee, createdAt: uniqueValue, id: uniqueValue };
    return store.dispatch({
      type: 'ADD_EMPLOYEE',
      payload: uniqueEmployee,
    });
  };
  return { addEmployee };
}
