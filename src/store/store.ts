import {configureStore} from '@reduxjs/toolkit';
import {EmployeeModel, EmployeeStateModel} from './employee.model.ts';
import mockData from '../data/mockData.json';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

/**
 * start with local mock data
 */
const employeeState: EmployeeStateModel = {employees: mockData as unknown as EmployeeModel[]};

/**
 * Reducers list the only actual action that can be performed on the state
 * @param currentState
 * @param action
 */
const reducer = (currentState: any = employeeState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            console.log('Adding employee', action.payload);
            return {...currentState, employees: [...currentState.employees, action.payload]};
        default:
            return currentState;
    }
};

const persistConfig = {
    key: 'root',
    storage, // defaults to localStorage for web
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        }
    })
})


export const persistor = persistStore(store);
