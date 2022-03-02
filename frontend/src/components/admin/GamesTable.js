import React from 'react';
import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

export default function GamesTable() {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const data = [];

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * pageSize - data.length) : 0;

  const handleChangePageSize = (event) => {
    setPageSize(parseInt(event.target.value, 5));
    setPage(0);
  } 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="games pagination table">
              <TableBody>
                {(pageSize > 0
                  ? data.slice(page * pageSize, page * pageSize + pageSize)
                  : data)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>
                        {row.name}
                      </TableCell>
                      <TableCell>
                        {row.active}
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
                    rowsPerPageOption={[5, 10, 20, 30, { label: 'All', value: '-1' }]}
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={pageSize}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangePageSize}
                    ActionsComponent={TablePaginationActions} />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};