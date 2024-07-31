import React, { ChangeEvent, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from '@mui/material';
import { Employee } from '../../interface/employee.interface.ts';

const DataTable = ({ data }: { data: Employee[] }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filterToSearchOn, setFilterToSearchOn] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Employee>('id');

  /**
   * when the user change the page, we need to update the currentPage state
   * @param _event is unused but necessary
   * @param newPage
   */
  const handleChangePage = (_event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  /**
   * when the user change the rowsPerPage, we need to update the rowsPerPage and reset the currentPage to 0
   * @param event
   */
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value)); // set the rowsPerPage to the selected value
    setCurrentPage(0); // reset the page to 0 when changing the rowsPerPage to come back to beginig
  };

  /**
   * when the user change the filter, we need to update the state filter
   * @param event
   */
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterToSearchOn(event.target.value);
  };

  /**
   * when the user click on the header of the table, we need to sort the data
   * we check the actual order by to compare with the clicked one
   * if the actual order by is the clicked one, we reverse the order to the opposite
   * if the actual order by is not the clicked one, we change the order to asc for the new selected orderBy
   * @param propertyToOrderBy
   */
  const handleRequestSort = (propertyToOrderBy: keyof Employee) => {
    const isAsc = orderBy === propertyToOrderBy && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(propertyToOrderBy);
  };

  /**
   * filter on all the data global array
   * take every row values and check if one of them contains the filter
   * create an arry with every row that contains the filter
   * check if the employee has the filter string in its values
   * fill the array with the employee that contains the filter to search from the state
   */
  const filteredData = data.filter(employee =>
    Object.values(employee).some(
      value => value.toString().toLowerCase().indexOf(filterToSearchOn.toLowerCase()) !== -1,
    ),
  );

  /**
   * sort the data by the orderBy and the order
   */
  const sortedData = filteredData.sort((a, b) => {
    if (a[orderBy]! < b[orderBy]!) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy]! > b[orderBy]!) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  /**
   * slice the data to display only the pagination part
   */
  const displayedData = sortedData.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  const headCells: { id: keyof Employee; label: string }[] = [
    { id: 'id', label: 'ID' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'dateOfBirth', label: 'Date of Birth' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'street', label: 'Street' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State' },
    { id: 'zipCode', label: 'Zip Code' },
    { id: 'department', label: 'Department' },
  ];

  return (
    <Paper>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filterToSearchOn}
        onChange={handleFilterChange}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map(headCell => (
                <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                  <TableSortLabel
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
            {displayedData.map(employee => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.dateOfBirth}</TableCell>
                <TableCell>{employee.startDate}</TableCell>
                <TableCell>{employee.street}</TableCell>
                <TableCell>{employee.city}</TableCell>
                <TableCell>{employee.state}</TableCell>
                <TableCell>{employee.zipCode}</TableCell>
                <TableCell>{employee.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
