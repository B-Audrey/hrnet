import { useStore } from 'react-redux';
import { Employee } from '../interface/employee.interface.ts';

export default function useEmployeeStore() {
  const store = useStore();
  let idIncrement: number = 2000;

  const addEmployee = (employee: Employee) => {
    console.log('je rentre dans le employee store hook avec', employee);
    idIncrement++
    return store.dispatch({ type: 'ADD_EMPLOYEE', payload: {...employee, id: idIncrement} });
  };
  return { addEmployee };
}
