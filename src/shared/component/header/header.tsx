import React from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <h1>HRnet</h1>
      <nav>
        <NavLink to={'/employees'}>View CurrentEmployees</NavLink>
      </nav>
    </>
  );
}
