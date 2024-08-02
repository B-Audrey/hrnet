import {configureStore} from '@reduxjs/toolkit';
import {EmployeeModel, EmployeeStateModel} from './employee.model.ts';
import mockData from '../data/mockData.json';

const employeeState: EmployeeStateModel = {employees: mockData as unknown as EmployeeModel[]};

const reducer = (currentState: any, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            console.log('Adding employee', action.payload);
            return {employees: [...currentState.employees, action.payload]};
        default:
            return currentState;
    }
};

export const store = configureStore(
    {
        preloadedState: employeeState,
        reducer,
    },
);
