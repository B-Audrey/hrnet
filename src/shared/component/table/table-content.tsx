import './table.scss';
import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {DataTableProps} from '../../interface/dataParams.interface.ts';

const TableContent = ({data, order, orderBy, handleRequestSort, headCells}: DataTableProps) => {
    return (
        <TableContainer>
            <Table>
                <TableHead className={'table-header'}>
                    <TableRow>
                        {headCells.map(headCell => (
                            <TableCell key={headCell.id}
                                       sortDirection={orderBy === headCell.id ? order : false}
                            >
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
                            <TableCell className={'table-row'}>{employee.firstName}</TableCell>
                            <TableCell className={'table-row'}>{employee.lastName}</TableCell>
                            <TableCell className={'table-row'}>{new Date(employee.startDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                            })}</TableCell>
                            <TableCell className={'table-row'}>{employee.department}</TableCell>
                            <TableCell className={'table-row'}>{new Date(employee.dateOfBirth).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                            })}</TableCell>
                            <TableCell className={'table-row'}>{employee.street}</TableCell>
                            <TableCell className={'table-row'}>{employee.city}</TableCell>
                            <TableCell className={'table-row'}>{employee.state}</TableCell>
                            <TableCell className={'table-row'}>{employee.zipCode}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableContent;
