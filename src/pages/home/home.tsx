import 'french-date-picker/style.css'
import './home.scss';
import React, {useEffect, useRef, useState} from 'react';
import Select from '../../shared/component/select/select.tsx';
import {departmentList, states} from '../../shared/variables.ts';
import {NavLink} from 'react-router-dom';
import useEmployeeStore from '../../shared/hook/useEmployeeStore.tsx';
import {Employee} from '../../shared/interface/employee.interface.ts';
import Dialog from '../../shared/component/dialog/dialog.tsx';
import {createPortal} from 'react-dom';
import useEscapeKeyDown from '../../shared/hook/useEscapeKeyDown.tsx';
import isStringValid, {StringValidatorRules} from '../../shared/utils/stringValidator.ts';
import Input from '../../shared/component/input/input.tsx';
import {DatePicker} from 'french-date-picker';

export default function Home() {
    const [newEmployee, setNewEmployee] = useState<Employee>({} as Employee);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applyModalFn, setApplyModalFn] = useState(false);
    const [isFormValid, setIsFormValid] = useState({isValid: false, message: ''});
    const formRef = useRef<HTMLFormElement>(null);
    const stateSelectRef = useRef<{ getValue: () => string }>(null);
    const departmentSelectRef = useRef<{ getValue: () => string }>(null);
    const {addEmployee} = useEmployeeStore();

    useEscapeKeyDown(setIsModalOpen);

    useEffect(() => {
        if (applyModalFn) {
            modalFn();
            setApplyModalFn(false);
        }
    }, [applyModalFn]);

    const modalFn = () => {
        console.log('Employee to send', newEmployee);
        addEmployee(newEmployee);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsFormValid({isValid: true, message: ''});
        let formData = new FormData(formRef.current!);
        let updatedEmployee = {...newEmployee};

        for (let [name, value] of formData) {
            if (!value) {
                return setIsFormValid({isValid: false, message: 'All form fields must be completed'});
            }
            const isValid = isStringValid(value.toString(), [StringValidatorRules.noSpecialChars, StringValidatorRules.hasNotOnlySpaces, StringValidatorRules.notTooLong]);
            if (!isValid.isValid) {
                return setIsFormValid({isValid: false, message: `Form field ${name} is in error : ${isValid.message}`});
            }
            updatedEmployee = {...updatedEmployee, [name]: value};
        }

        if (stateSelectRef.current) {
            const value = stateSelectRef.current.getValue();
            if (!value) {
                const isValid = isStringValid(value, [StringValidatorRules.notEmpty]);
                if (!isValid.isValid) {
                    return setIsFormValid({
                        isValid: false,
                        message: 'All form fields must be completed : State is missing'
                    });
                }
            }
            updatedEmployee = {...updatedEmployee, state: value};
        }

        if (departmentSelectRef.current) {
            const value = departmentSelectRef.current.getValue();
            if (!value) {
                const isValid = isStringValid(value, [StringValidatorRules.notEmpty]);
                if (!isValid.isValid) {
                    return setIsFormValid({isValid: false, message: 'All form fields must be completed'});
                }
            }
            updatedEmployee = {...updatedEmployee, department: value};
        } else {
            return setIsFormValid({
                isValid: false,
                message: 'All form fields must be completed : Department is missing'
            });
        }
        setNewEmployee(updatedEmployee);
        setIsModalOpen(true);
    };

    const modalContent = {
        title: 'ADD NEW EMPLOYEE',
        content: `Are you sure you want to add you new Employee ${newEmployee?.firstName} ${newEmployee?.lastName} to the list of employees ?`,
    };

    return (
        <>
            <NavLink to={'/hrnet/employees'}>View Current Employees</NavLink>
            <div className={'container'}>
                <h2>Create Employee</h2>
                <form onSubmit={handleSubmit} ref={formRef} id="create-employee" className={'form'}>
                    <fieldset className="address">
                        <legend>Identity</legend>
                        <Input
                            label={'First Name'}
                            name={'firstName'}
                            id={'firstName'}
                            validatorOptions={[
                                StringValidatorRules.notTooLong,
                                StringValidatorRules.noSpecialChars,
                                StringValidatorRules.hasNotOnlySpaces,
                            ]}
                            type={'text'}
                            isRequired={true}
                        />

                        <Input
                            label={'Last Name'}
                            name={'lastName'}
                            id={'lastName'}
                            validatorOptions={[
                                StringValidatorRules.notTooLong,
                                StringValidatorRules.noSpecialChars,
                                StringValidatorRules.hasNotOnlySpaces,
                            ]}
                            type={'text'}
                            isRequired={true}
                        />

                        <DatePicker
                            mainColor={'rgb(142,154,128)'}
                            backgroundColor={'#f4d6ab'}
                            textColor={'#000'}
                            labelText={'Date of Birth'}
                            inputName={'dateOfBirth'}
                            isRequired={true}
                            returnFormat='zuluString'
                        />
                    </fieldset>

                    <DatePicker
                        mainColor={'rgb(142,154,128)'}
                        backgroundColor={'#f4d6ab'}
                        textColor={'#000'}
                        labelText={'Start Date'}
                        inputName={'startDate'}
                        isRequired={true}
                        returnFormat='zuluString'
                    />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <Input
                            label={'Street'}
                            name={'street'}
                            id={'street'}
                            validatorOptions={[
                                StringValidatorRules.notTooLong,
                                StringValidatorRules.noSpecialChars,
                                StringValidatorRules.hasNotOnlySpaces,
                            ]}
                            type={'text'}
                            isRequired={true}
                        />

                        <Input
                            label={'City'}
                            name={'city'}
                            id={'city'}
                            validatorOptions={[
                                StringValidatorRules.notTooLong,
                                StringValidatorRules.noSpecialChars,
                                StringValidatorRules.hasNotOnlySpaces,
                            ]}
                            type={'text'}
                            isRequired={true}
                        />

                        <Select label={'State'} ref={stateSelectRef} itemList={states.map(state => state.name)}/>

                        <Input
                            label={'Zip Code'}
                            name={'zipCode'}
                            id={'zipCode'}
                            validatorOptions={[
                                StringValidatorRules.notEmpty,
                                StringValidatorRules.notTooLong,
                                StringValidatorRules.noSpecialChars,
                                StringValidatorRules.hasNotOnlySpaces,
                            ]}
                            type={'number'}
                            isRequired={true}
                            min={0}
                        />
                    </fieldset>

                    <Select label={'Department'} ref={departmentSelectRef} itemList={departmentList}/>
                    <button className={'save-button'}>
                        Save
                    </button>
                    <span className={`input-error ${!isFormValid.isValid ? 'fade-in' : ''}`}>
                        {isFormValid.message}
                    </span>
                </form>
            </div>
            {isModalOpen &&
                createPortal(
                    <Dialog
                        modalContent={modalContent}
                        isCancelButton={true}
                        isConfirmButton={true}
                        setFnState={setApplyModalFn}
                        setIsModalOpen={setIsModalOpen}
                    />,
                    document.body,
                )}
        </>
    );
}
