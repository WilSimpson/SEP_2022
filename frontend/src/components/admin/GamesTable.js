import React from 'react';
import { Autocomplete, ButtonGroup, Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { Delete, Edit } from '@material-ui/icons';
import { Game } from '../../models/game.model';
import { formatDate } from '../../helpers/DateFormatter';
import { useNavigate } from 'react-router';

export default function GamesTable(props) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const navigate = useNavigate();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * pageSize - props.data.length) : 0;

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={2}>
        <h2>All Games</h2>
      </Grid>
      <Grid item xs={10}>
        <Autocomplete
          disablePortal
          freeSolo
          id="game-search"
          options={props.data.map((game) => game.title)}
          renderInput={(params) => <TextField {...params} label="Find Game" />}
          onChange={(event, selected) => { window.location.href = `/admin-dashboard/games/${selected.id}` }}
        />
      </Grid>
      <Grid item xs={12}>
        <TableContainer data-testid="games-table">
          <Table sx={{ minWidth: 500 }} aria-label="games pagination table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
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
                      {row.title}
                    </TableCell>
                    <TableCell>
                      {formatDate(row.created_at)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.active ? "ACTIVE" : "INACTIVE"}
                        color={row.active ? "primary" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="outlined" aria-label="edit delete game button group">
                        <IconButton aria-label="edit" onClick={() => { navigate(`/admin-dashboard/games/${row.id}`) }}>
                          <Edit />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <Delete />
                        </IconButton>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}

              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={5} />
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
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangePageSize} />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};