import React from 'react';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import {Delete, Edit} from '@material-ui/icons';
import {formatDate} from '../../helpers/dateFormatter';

export default function GamesTable(props) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [confirmationDeleteID, setConfirmationDeleteID] = React.useState(null);
  const games = props.data || [];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * pageSize - games.length) : 0;

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCloseConfirmation = () => {
    setConfirmationDeleteID(null);
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Dialog open={confirmationDeleteID != null}>
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this game?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deletion is permanent and this game can no longer be used or viewed.
            A hidden copy will be kept kept in the database for logging and
            compilation of reports that used this game.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onConfirmDelete(confirmationDeleteID)}>
            Delete Permanently
          </Button>
          <Button onClick={handleCloseConfirmation} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={2}>
        <h2>All Games</h2>
      </Grid>
      <Grid item xs={10}>
        <Autocomplete
          disablePortal
          freeSolo
          id="game-search"
          options={games.map((game) => game.title)}
          renderInput={(params) => <TextField {...params} label="Find Game" />}
          onChange={(event, selected) => {
            window.location.href = `/admin-dashboard/games/${selected.id}`;
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TableContainer data-testid="games-table">
          <Table sx={{minWidth: 500}} aria-label="games pagination table">
            <TableHead>
              <TableRow className="game-columns">
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(pageSize > 0 ?
                games.slice(page * pageSize, page * pageSize + pageSize) :
                games
              ).map((game) => (
                <TableRow key={game.id} className="game-row">
                  <TableCell component="th" scope="row">
                    {game.id}
                  </TableCell>
                  <TableCell>{game.title}</TableCell>
                  <TableCell>{formatDate(game.created_at)}</TableCell>
                  <TableCell>
                    <Chip
                      label={game.active ? 'ACTIVE' : 'INACTIVE'}
                      color={game.active ? 'primary' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <ButtonGroup
                      variant="outlined"
                      aria-label="edit delete game button group"
                    >
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          props.onEdit(game.id);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          setConfirmationDeleteID(game.id);
                        }}
                      >
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
              <TableRow className="game-pagination">
                <TablePagination
                  rowsPerPageOptions={[5, 15, 30, {label: 'All', value: -1}]}
                  colSpan={3}
                  count={games.length}
                  rowsPerPage={pageSize}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangePageSize}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}