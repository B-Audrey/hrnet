import {configureStore} from '@reduxjs/toolkit';
import {EmployeeModel} from './employeeModel.ts';
import mockData from '../../mockData.json';

const employeeState: EmployeeModel[] = mockData as unknown as EmployeeModel[];
let idIncrement:number = 500;

const reducer = (currentState:any, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            action.payload.id = idIncrement;
            idIncrement++;
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
