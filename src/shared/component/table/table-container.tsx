import React, {ChangeEvent, useEffect, useState} from 'react';
import {Paper, TablePagination} from '@mui/material';
import {Employee} from '../../interface/employee.interface.ts';
import Input from '../input/input.tsx';
import {fetchData, getTotalOfAvailableDataCount} from '../../service/data.service.ts';
import TableContent from './table-content.tsx';


const DataTableContainer = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [filterToSearchOn, setFilterToSearchOn] = useState<string>('');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Employee>('id');
    const [data, setData] = useState<Employee[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        const fetchDataAsync = async () => {
            const result = fetchData({
                filterToSearchOn,
                order,
                orderBy,
                currentPage,
                rowsPerPage
            });
            setData(result);
            setTotalCount(getTotalOfAvailableDataCount(filterToSearchOn));
        };
        fetchDataAsync();
    }, [filterToSearchOn, order, orderBy, currentPage, rowsPerPage]);

    const handleChangePage = (_event: any, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    };

    const handleRequestSort = (propertyToOrderBy: keyof Employee) => {
        const isAsc = orderBy === propertyToOrderBy && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(propertyToOrderBy);
    };

    const headCells: { id: keyof Employee; label: string }[] = [
        {id: 'firstName', label: 'First Name'},
        {id: 'lastName', label: 'Last Name'},
        {id: 'startDate', label: 'Start Date'},
        {id: 'department', label: 'Department'},
        {id: 'dateOfBirth', label: 'Date of Birth'},
        {id: 'street', label: 'Street'},
        {id: 'city', label: 'City'},
        {id: 'state', label: 'State'},
        {id: 'zipCode', label: 'Zip Code'},
    ];

    const setInputValueFn = (value: string) => {
        setFilterToSearchOn(value);
        setCurrentPage(0);
    }

    return (
        <div id={'table'}>
            <Input label={'Search on table'}
                   name={'filterToSearchOn'}
                   id={'search-input'}
                   type={'text'}
                   isRequired={false}
                   setValue={setInputValueFn}
            />
            <Paper>
                <TableContent
                    data={data}
                    order={order}
                    orderBy={orderBy}
                    handleRequestSort={handleRequestSort}
                    headCells={headCells}
                />
                <TablePagination
                    className={'table-pagination'}
                    component="div"
                    count={totalCount}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default DataTableContainer;
