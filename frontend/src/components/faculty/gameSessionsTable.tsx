import React from 'react';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {formatDate} from '../../helpers/dateFormatter';

interface GameSessionTableProps {
  gameSessions: GameSession[];
  onReportButtonClicked(number): void;
}

export default function GameSessionsTable(props: GameSessionTableProps) {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);

  const emptyRows =
      page > 0 ?
        Math.max(0, (1 + page) * pageSize - props.gameSessions.length) :
        0;

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" gutterBottom>
        Game Sessions
      </Typography>
      <Table size="small" data-testid="active-game-sessions">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Game Code</TableCell>
            <TableCell>View Reports</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.gameSessions.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Tooltip title="Download QR Code">
                  <IconButton size="large">
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{formatDate(row.start_time)}</TableCell>
              <TableCell>{formatDate(row.end_time)}</TableCell>
              <TableCell>{row.code}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={props.onReportButtonClicked}>Reports</Button>
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
          <TableRow className="game-session-pagination">
            <TablePagination
              rowsPerPageOptions={[5, 15, 30, {label: 'All', value: -1}]}
              colSpan={3}
              count={props.gameSessions.length}
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
    </React.Fragment>
  );
}
