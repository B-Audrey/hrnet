import { useStore } from 'react-redux';
import { Employee } from '../interface/employee.interface.ts';

export default function useEmployeeService() {
  const store = useStore();
  let idIncrement: number = 500;

  const addEmployee = (employee: Employee) => {
    employee.id = idIncrement++;
    idIncrement = employee.id;
    return store.dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
  };
  return { addEmployee };
}
