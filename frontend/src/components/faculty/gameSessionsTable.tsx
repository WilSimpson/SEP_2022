import React from 'react';
import {
  Button,
  Checkbox,
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

/**
 * Properties used in the GameSessionsTable component
 */
interface GameSessionTableProps {
  /**
   * Game sessions to show in the table
   */
  gameSessions: GameSession[];

  /**
   * Callback for when the report button is clicked for a sessoin
   * @param {number} id session id for the button that was clicked
   */
  onReportButtonClicked(id: number): void;

  /**
   * Whether to have a column for a link to the reports button
   */
  reportButtons: boolean;

  /**
   * Whether to have a column for downloading QR codes to join the sessions
   */
  qrCodes: boolean;

  /**
   * Whether to have a column for selecting a row
   */
  selectable: boolean;

  /**
   * Callback when the selected sessions changes
   * @param {Set<number>} ids selected sessions by ids
   */
  onSessionSelectionChange(ids: Set<number>): void;

  /**
   * Currently selected session ids
   */
  selectedSessions: Set<number>;
}

/**
 * A table showing game session
 * @param {GameSessionTableProps} props properties to use for the table
 * @return {React.ReactFragment} rendering of table
 */
export default function GameSessionsTable(props: GameSessionTableProps) {
  // Current page
  const [page, setPage] = React.useState(0);

  // Number of elements to show per page
  const [pageSize, setPageSize] = React.useState(5);

  // Set of selected game session
  const [selectedSet, setSelectedSet] = React.useState(props.selectedSessions || new Set<number>());

  // Number of empty rows
  const emptyRows =
      page > 0 ?
        Math.max(0, (1 + page) * pageSize - props.gameSessions.length) :
        0;

  // Handles when the page size selection changes
  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };

  // Handles when a new page is selected
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Update the set by adding the id to the set if it isn't there,
  // or removing it is there.
  const handleCheckboxChange = (id: number) => {
    let newSet: Set<number>;

    if (selectedSet.has(id)) {
      newSet = new Set([...selectedSet].filter((i) => i != id));
      setSelectedSet(newSet);
    } else {
      newSet = selectedSet.add(id);
      setSelectedSet(newSet);
    }

    props.onSessionSelectionChange(selectedSet);
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" gutterBottom>
        Game Sessions
      </Typography>
      <Table data-testid="active-game-sessions">
        <TableHead>
          <TableRow>
            {props.selectable ? <TableCell></TableCell> : null}
            {props.qrCodes ? <TableCell>QR Code</TableCell> : null}
            <TableCell>ID</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Game Code</TableCell>
            {props.reportButtons ? <TableCell>View Reports</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.gameSessions.map((row, index) => (
            <TableRow key={row.id}>
              {props.selectable ?
                <Checkbox
                  onChange={() => handleCheckboxChange(row.id)}
                  defaultChecked={selectedSet.has(row.id)}
                /> : null
              }
              {props.qrCodes ?
                <TableCell>
                  <Tooltip title="Download QR Code">
                    <IconButton size="large">
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell> :
                null
              }
              <TableCell>{row.id}</TableCell>
              <TableCell>{formatDate(row.start_time)}</TableCell>
              <TableCell>{formatDate(row.end_time)}</TableCell>
              <TableCell>{row.code}</TableCell>
              {props.reportButtons ?
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => props.onReportButtonClicked(row.id)}
                  >
                    Reports
                  </Button>
                </TableCell> :
                null
              }
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
