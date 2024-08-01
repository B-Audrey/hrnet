import React from 'react';
import './employees.scss';
import { NavLink } from 'react-router-dom';
import DataTableContainer from '../../shared/component/table/table-container.tsx';

export default function Employees() {
  return (
    <>
      <DataTableContainer />

      <NavLink to={'/'}>Go to Home</NavLink>
    </>
  );
}
