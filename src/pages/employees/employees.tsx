import React from 'react';
import './employees.scss';
import { NavLink } from 'react-router-dom';
import Table from '../../shared/component/table/table.tsx';
import mockData from '../../../mockData.json';

export default function Employees() {

    // faire un selecteur pour voir les employées ajoutés par le formulaire
    // TODO demander à Lucien, si à l'ajout on doit ajouter dans le fichier json pour faire persister la donnée au dela su state

  return (
    <>
      <h2>Employees Works</h2>
      <Table data={mockData} />

      <NavLink to={'/'}>Go to Home</NavLink>
    </>
  );
}
