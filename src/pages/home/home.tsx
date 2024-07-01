import React, {useEffect, useState} from 'react';
import './home.scss';
import {Modal} from 'modal-lib';
import 'modal-lib/style.css';
import Select from '../../shared/component/select/select.tsx';
import {departmentList, states} from '../../shared/variables.ts';
import {NavLink} from 'react-router-dom'; //TODO voir avec Lucien pourquoi il faut importer manuellement !!!!

export default function Home() {
    const modalContent = {
        title: 'Hello',
        content: 'This is a modal',
    };

    const [currentDepartment, setCurrentDepartment] = useState('');
    const [currentState, setCurrentState] = useState('');

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zipCode: 0,
        department: '',
    });

    useEffect(() => {
        setForm(prevForm => ({...prevForm, state: currentState}));
    }, [currentState]);

    useEffect(() => {
        setForm(prevForm => ({...prevForm, department: currentDepartment}));
    }, [currentDepartment]);

    useEffect(() => {
        console.log(form);
    }, [form]);

    const [applyModalFn, setApplyModalFn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalFn = () => {
        console.log('ma fn a appliquer est appelée depuis mon front');
    };

    useEffect(() => {
        if (applyModalFn) {
            modalFn();
            console.log('j applique ma fn et je ferme la modale');
            setApplyModalFn(false);
        }
    }, [applyModalFn]);

    return (
        <>
            <NavLink to={'/employees'}>View Current Employees</NavLink>
            <div className={'container'}>
                {/*<button onClick={() => setIsModalOpen(true)}>Open modal</button>*/}
                <h2>Create Employee</h2>
                <div id="create-employee" className={'form'}>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        onChange={e => setForm(prevForm => ({...prevForm, firstName: e.target.value}))}
                    />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name"
                           onChange={e => setForm(prevForm => ({...prevForm, lastName: e.target.value}))}/>

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input id="date-of-birth" type="date" onChange={e => setForm(prevForm => ({...prevForm, dateOfBirth: e.target.value}))}/>

                    <label htmlFor="start-date">Start Date</label>
                    <input id="start-date" type="date" onChange={e => setForm(prevForm => ({...prevForm, startDate: e.target.value}))}/>

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text"
                               onChange={e => setForm(prevForm => ({...prevForm, street: e.target.value}))}/>

                        <label htmlFor="city">City</label>
                        <input id="city" type="text"
                               onChange={e => setForm(prevForm => ({...prevForm, city: e.target.value}))}/>

                        <Select
                            label={'State'}
                            valueName={'state'}
                            itemList={states.map(state => state.name)}
                            item={currentState}
                            setItem={setCurrentState}
                        />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number"
                               onChange={e => setForm(prevForm => ({...prevForm, zipCode: parseInt(e.target.value)}))}/>
                    </fieldset>

                    <Select
                        label={'Department'}
                        valueName={'department'}
                        itemList={departmentList}
                        item={currentDepartment}
                        setItem={setCurrentDepartment}
                    />
                </div>
                <button className={'save-button'}>Save</button>
            </div>
            {isModalOpen ? (
                <Modal
                    modalContent={modalContent}
                    isCancelButton={true}
                    isConfirmButton={true}
                    setFnState={setApplyModalFn}
                    setIsModalOpen={setIsModalOpen}
                />
            ) : null}
        </>
    );
}
