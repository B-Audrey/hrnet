import './select.scss';
import React from 'react';

export default function Select({
  label,
  valueName,
  itemList,
  item,
  setItem,
}: {
  label: string;
  valueName: string;
  itemList: string[];
  item: string;
  setItem: any;
}) {
  return (
    <div className={'select-component'}>
      <label htmlFor={label}>{label}</label>
      <select name={valueName} id={label} value={item} onChange={e => setItem(e.target.value)}>
        {itemList.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
