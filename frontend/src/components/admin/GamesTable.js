import React from 'react';
import { Box, Chip, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { Games } from '../../helpers/DummyData';

export default function GamesTable(props) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * pageSize - props.data.length) : 0;

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  } 

  const handleChangePage = (event, newPage) => {
    
    setPage(newPage);
  };


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="games pagination table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(pageSize > 0
            ? props.data.slice(page * pageSize, page * pageSize + pageSize)
            : props.data)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>
                  {row.name}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.active ? "ACTIVE" : "INACTIVE"}
                    color={row.active ? "primary" : "warning"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}

          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 15, 30, { label: 'All', value: -1 }]}
              colSpan={3}
              count={props.data.length}
              rowsPerPage={pageSize}
              page={page}
              // SelectProps={{
              //   inputProps: {
              //     'aria-label': 'rows per page',
              //   },
              //   native: true
              // }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangePageSize} />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};