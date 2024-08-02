import { useStore } from 'react-redux';
import { Employee } from '../interface/employee.interface.ts';

/**
 * This hook is used to add an employee to the store
 */
export default function useEmployeeStore() {
  const store = useStore();
  let idIncrement: number = 2000;

  const addEmployee = (employee: Employee) => {
    idIncrement++
    return store.dispatch({ type: 'ADD_EMPLOYEE', payload: {...employee, id: idIncrement} });
  };
  return { addEmployee };
}
