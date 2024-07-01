import React from 'react';
import './employees.scss';
import { NavLink } from 'react-router-dom';

export default function Employees() {
  return (
    <>
      <h2>Employees Works</h2>
      <NavLink to={'/'}>Go to Home</NavLink>
    </>
  );
}
