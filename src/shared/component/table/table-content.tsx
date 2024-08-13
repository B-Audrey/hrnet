import './table.scss';
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { headCells } from '../../variables.ts';
import { DataTableProps } from '../../interface/props.interface.ts';

const TableContent = ({ data, order, orderBy, handleRequestSort }: DataTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead className={'table-header'}>
          <TableRow>
            {headCells.map(headCell => (
              <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                <TableSortLabel
                  className={'table-label table-row'}
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleRequestSort(headCell.id)}>
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(employee => (
            <TableRow key={employee.id}>
              <TableCell className={'table-row'}>{employee.firstName || 'first Name is to be defined'}</TableCell>
              <TableCell className={'table-row'}>{employee.lastName || 'last Name is to be defined'}</TableCell>
              <TableCell className={'table-row'}>{employee.startDate || 'start date is to be defined'}</TableCell>
              <TableCell className={'table-row'}>{employee.department || 'department is to be defined'}</TableCell>
              <TableCell className={'table-row'}>{employee.dateOfBirth || 'date of birth is to be defined'}</TableCell>
              <TableCell className={'table-row'}>{employee.street || 'street is to be defined'}</TableCell>
              <TableCell className={'table-row'}>{employee.city || 'city is to be defined'}</TableCell>
              <TableCell className={'table-row'}>{employee.state || 'state is to be defined'}</TableCell>
              <TableCell className={'table-row'}>{employee.zipCode || 'zip code is to be defined'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContent;
