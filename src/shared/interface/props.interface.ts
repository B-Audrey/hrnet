import {StringValidatorRules} from '../utils/stringValidator.ts';
import {Employee} from './employee.interface.ts';
import {ReactNode} from 'react';

export interface InputProps {
    label: string,
    name: string,
    id: string,
    validatorOptions?: StringValidatorRules[],
    type: string,
    isRequired: boolean
    min?: number,
    max?: number,
    setValue?: any
}

export interface SelectProps {
    label: string;
    itemList: string[]
}

export interface DialogProps {
    isCancelButton: boolean;
    isConfirmButton: boolean;
    modalContent: DialogContent;
    setFnState: any; // TODO : typer
    setIsModalOpen: any;
}

export interface DialogContent {
    title: string;
    content: ReactNode;
}

export interface DataTableProps {
    data: Employee[];
    order: 'asc' | 'desc';
    orderBy: keyof Employee;
    handleRequestSort: (propertyToOrderBy: keyof Employee) => void;
}
