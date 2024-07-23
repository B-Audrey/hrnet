import './select.scss';
import React from 'react';

export default function Select({
  label,
  valueName,
  itemList,
}: {
  label: string;
  valueName: string;
  itemList: string[];
}) {

  // TODO demander à Lucien si on doit faire l'impasse sur la sémantique pour du full custom

  return (
    <div className={'select-component'}>
      <label htmlFor={label}>{label}</label>
      <select name={valueName} id={label}>
        {itemList.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
