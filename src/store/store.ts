import {configureStore} from '@reduxjs/toolkit';
import {EmployeeModel} from './employeeModel.ts';
import mockData from '../../mockData.json';

const employeeState: EmployeeModel[] = mockData as unknown as EmployeeModel[];

const reducer = (currentState: any, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            console.log('Adding employee');
            return [...currentState, action.payload];
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
