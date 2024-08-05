import React, { ChangeEvent, useEffect, useState } from 'react';
import { Paper, TablePagination } from '@mui/material';
import { Employee } from '../../interface/employee.interface.ts';
import Input from '../input/input.tsx';
import useEmployeeData from '../../hook/useEmployeeDataService.tsx';
import TableContent from './table-content.tsx';
import Loader from '../loader/loader.tsx';

const DataTableContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filterToSearchOn, setFilterToSearchOn] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Employee>('id');
  const [data, setData] = useState<{ employees: Employee[]; totalCount: number }>({ employees: [], totalCount: 0 });

  const { getData, loading } = useEmployeeData();

  /**
   * Fetch data when the component mounts and when params changes
   */
  useEffect(() => {
    getData({ filterToSearchOn, order, orderBy, currentPage, rowsPerPage }).then(data => data && setData(data));
  }, [currentPage, rowsPerPage, filterToSearchOn, order, orderBy]);

  /**
   * Handle page change to update local state
   * @param _event
   * @param newPage
   */
  const handleChangePage = (_event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  /**
   * Handle rows per page change to update local state
   * @param event
   */
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  /**
   * Handle request sort to update local state
   * @param propertyToOrderBy
   */
  const handleRequestSort = (propertyToOrderBy: keyof Employee) => {
    const isAsc = orderBy === propertyToOrderBy && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(propertyToOrderBy);
  };

  /**
   * Handle filter change to update local state when the inout value change
   * Set current page to 0 to re-start from the beginning
   * @param value
   */
  const handleFilterChange = (value: string) => {
    setFilterToSearchOn(value);
    setCurrentPage(0);
  };

  return (
    <div id={'table'}>
      <Input
        label={'Search on table'}
        name={'filterToSearchOn'}
        id={'search-input'}
        type={'text'}
        isRequired={false}
        setValue={handleFilterChange}
      />
      <Paper>
        {loading ? (
          <Loader />
        ) : (
          <>
            <TableContent data={data.employees} order={order} orderBy={orderBy} handleRequestSort={handleRequestSort} />
            <TablePagination
              className={'table-pagination'}
              component="div"
              count={data.totalCount}
              page={currentPage}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </div>
  );
};

export default DataTableContainer;
