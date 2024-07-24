import React from 'react';
import './employees.scss';
import { NavLink } from 'react-router-dom';
import Table from '../../shared/component/table/table.tsx';
import mockData from '../../../mockData.json';
import {Employee} from '../../shared/interface/employee.ts';

export default function Employees() {
  return (
    <>
      <h2>Employees Works</h2>
      <Table data={mockData as unknown as Employee[]} />

      <NavLink to={'/'}>Go to Home</NavLink>
    </>
  );
}
