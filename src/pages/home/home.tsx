import 'french-date-picker/style.css'
import './home.scss';
import React, {useEffect, useRef, useState} from 'react';
import Select from '../../shared/component/select/select.tsx';
import {departmentList, states} from '../../shared/variables.ts';
import {NavLink} from 'react-router-dom';
import useEmployeeService from '../../shared/service/use-employee-service.tsx';
import {Employee} from '../../shared/interface/employee.interface.ts';
import Dialog from '../../shared/component/dialog/dialog.tsx';
import {createPortal} from 'react-dom';
import useEscapeKeyDown from '../../shared/hook/useEscapeKeyDown.ts';
import isStringValid, {StringValidatorRules} from '../../shared/utils/stringValidator.ts';
import Input from '../../shared/component/input/input.tsx';
import {DatePicker} from 'french-date-picker';

export default function Home() {
    const modalContent = {
        title: 'Employé ajouté',
        content: 'Je dois mettre le bon texte ici',
    };

    const formRef = useRef<HTMLFormElement>(null); // va contenir la ref du formulaire
    let employeeToSend = {} as Employee;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applyModalFn, setApplyModalFn] = useState(false);
    const stateSelectRef = useRef<{ getValue: () => string }>(null); // need to use a local ref to use custom select
    const departmentSelectRef = useRef<{ getValue: () => string }>(null); // need to use local ref ti use custom select
    const [isFormValid, setIsFormValid] = useState({isValid: false, message: ''});
    const {addEmployee} = useEmployeeService();

    useEscapeKeyDown(setIsModalOpen);

    useEffect(() => {
        if (applyModalFn) {
            modalFn();
            console.log('j applique ma fn et je ferme la modale');
            setApplyModalFn(false);
        }
    }, [applyModalFn]);

    const modalFn = () => {
        console.log('ma fn a appliquer est appelée depuis mon front pour ajouter un employé');
        addEmployee(employeeToSend);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setIsFormValid({isValid: true, message: ''});
        let formData = new FormData(formRef.current!);
        console.log(...formData);
        for (let [name, value] of formData) {
            if (!value) {
                return setIsFormValid({isValid: false, message: 'All form fields must be completed'});
            }
            const isValid = isStringValid(value.toString(), [StringValidatorRules.noSpecialChars, StringValidatorRules.hasNotOnlySpaces, StringValidatorRules.notTooLong]);
            if (!isValid.isValid) {
                return setIsFormValid({isValid: false, message: `Form field ${name} is in error : ${isValid.message}`});
            }
            employeeToSend = {...employeeToSend, [name]: value};
        }
        // Récupérer les valeurs sélectionnées des composants Select
        if (stateSelectRef.current) {
            const value = stateSelectRef.current.getValue();
            if (!value) {
                const isValid = isStringValid(value, [StringValidatorRules.notEmpty]);
                if (!isValid.isValid) {
                    return setIsFormValid({isValid: false, message: 'All form fields must be completed : State is missing'});
                }
                employeeToSend = {...employeeToSend, state: value};
            }
            if (departmentSelectRef.current) {
                const value = stateSelectRef.current.getValue();
                if (!value) {
                    const isValid = isStringValid(value, [StringValidatorRules.notEmpty]);
                    if (!isValid.isValid) {
                        return setIsFormValid({isValid: false, message: 'All form fields must be completed'});
                    }
                }
                employeeToSend = {...employeeToSend, department: departmentSelectRef.current.getValue()};
            } else {
                return setIsFormValid({isValid: false, message: 'All form fields must be completed : Department is missing'});
            }
            console.log(employeeToSend);
            setIsModalOpen(true);
        }
    }


    return (
        <>
            <NavLink to={'/employees'}>View Current Employees</NavLink>
            <div className={'container'}>
                <h2>Create Employee</h2>
                <form onSubmit={handleSubmit} ref={formRef} id="create-employee" className={'form'}
                      onChange={(e) => console.log(e)}>

                    <fieldset className="address">
                        <legend>Identity</legend>
                        <Input
                            label={'First Name'}
                            name={'first-name'}
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
                            name={'last-name'}
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
                            inputName={'date-of-birth'}
                            isRequired={true}
                            returnFormat='zuluString'
                        />
                    </fieldset>

                    <DatePicker
                        mainColor={'rgb(142,154,128)'}
                        backgroundColor={'#f4d6ab'}
                        textColor={'#000'}
                        labelText={'Start Date'}
                        inputName={'start-date'}
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
                            name={'zip-code'}
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
