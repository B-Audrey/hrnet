import React, {useEffect, useRef, useState} from 'react';
import './home.scss';
import Select from '../../shared/component/select/select.tsx';
import {departmentList, states} from '../../shared/variables.ts';
import {NavLink} from 'react-router-dom';
import useEmployeeService from '../../shared/service/use-employee-service.tsx';
import {Employee} from '../../shared/interface/employee.ts';
import Dialog from '../../shared/component/dialog/dialog.tsx';
import {createPortal} from 'react-dom';
import useEscapeKeyDown from '../../shared/hook/useEscapeKeyDown.ts';
import {DatePicker} from 'lib';
import 'lib/style.css';

export default function Home() {
    const modalContent = {
        title: 'Employé ajouté',
        content: 'Je dois mettre le bon texte ici',
    };

    const formRef = useRef<HTMLFormElement>(null); // va contenir la ref du formulaire
    let employeeToSend = {} as Employee

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applyModalFn, setApplyModalFn] = useState(false);
    const stateSelectRef = useRef<{ getValue: () => string }>(null); // need to use local ref to use custom select
    const departmentSelectRef = useRef<{ getValue: () => string }>(null); // need to use local ref ti use custom select
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
        let formData = new FormData(formRef.current!)
        console.log(...formData);
        for (let [name, value] of formData) {
            employeeToSend = {...employeeToSend, [name]: value}
        }
        // Récupérer les valeurs sélectionnées des composants Select
        if (stateSelectRef.current) {
            employeeToSend = {...employeeToSend, state: stateSelectRef.current.getValue()};
        }
        if (departmentSelectRef.current) {
            employeeToSend = {...employeeToSend, department: departmentSelectRef.current.getValue()};
        }
        console.log(employeeToSend);
        setIsModalOpen(true);
    }

    return (
        <>
            <NavLink to={'/employees'}>View Current Employees</NavLink>
            <div className={'container'}>
                {/*<button onClick={() => setIsModalOpen(true)}>Open modal</button>*/}
                <h2>Create Employee</h2>
                <form onSubmit={handleSubmit} ref={formRef} id="create-employee" className={'form'}>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        required
                        type="text"
                        id="first-name"
                        name={'first-name'}
                    />

                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        required
                        name={'last-name'}
                    />

                    <DatePicker mainColor={"rgb(142,154,128)"} backgroundColor={'#f4d6ab'}
                                textColor={'#000'} labelText={'Date of Birth'} inputName={'date-of-birth'}
                                isRequired={true} returnFormat={'zuluDate'}/>

                    <DatePicker mainColor={"rgb(142,154,128)"} backgroundColor={'#f4d6ab'}
                                textColor={'#000'} labelText={'Start Date'} inputName={'start-date'}
                                isRequired={true} returnFormat={'zuluDate'}/>

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input
                            id="street"
                            type="text"
                            required
                            name={'street'}
                        />

                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            type="text"
                            required
                            name={'city'}
                        />

                        <Select
                            label={'State'}
                            ref={stateSelectRef}
                            itemList={states.map(state => state.name)}
                        />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input
                            name={'zip-code'}
                            id="zip-code"
                            type="number"
                            required
                        />
                    </fieldset>

                    <Select
                        label={'Department'}
                        ref={departmentSelectRef}
                        itemList={departmentList}
                    />
                    <button className={'save-button'}>Save</button>
                </form>


            </div>
            {isModalOpen && createPortal(
                <Dialog
                    modalContent={modalContent}
                    isCancelButton={true}
                    isConfirmButton={true}
                    setFnState={setApplyModalFn}
                    setIsModalOpen={setIsModalOpen}
                />
                , document.body)}
        </>
    );
}
