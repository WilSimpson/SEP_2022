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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {formatDate} from '../../helpers/dateFormatter';
import {Cancel} from '@material-ui/icons';

/**
 * Properties used in the GameSessionsTable component
 */
interface GameSessionTableProps {
  /**
   * Game sessions to show in the table
   */

  gameSessions: GameSession[];

  /**
   * Callback for when the report button is clicked for a session
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
   * Callback for when a qr code button was clicked.
   * @param {number} joinCode session join code for the button that was clicked
   */
  onQRCodeButtonClicked(joinCode: number): void;

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

  // Force rerender
  const [, updateState] = React.useState();
  const gameSessions = props.gameSessions || [];

  const [confirmationEndID, setConfirmationEndID] = React.useState(null);

  // Number of empty rows
  const emptyRows =
      page > 0 ?
        Math.max(0, (1 + page) * pageSize - gameSessions.length) :
        0;

  // Calculates the number of active columns
  const colSize = 4 +
      (props.qrCodes ? 1 : 0) +
      (props.reportButtons ? 1 : 0) +
      (props.selectable ? 1 : 0);

  // The current sessions shown in the table
  const shownSessions = pageSize > 0 ?
      gameSessions.slice(page * pageSize, page * pageSize + pageSize) :
      gameSessions;

  // Handles when the page size selection changes
  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };

  // Handles when a new page is selected
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Update the set by adding the id to the set if it isn't there,
   * or removing it is there.
   * @param {number} id game session id to toggle
   */
  const handleCheckboxChange = (id: number) => {
    let selected = new Set<number>([...selectedSet]);

    if (selectedSet.has(id)) {
      selected = new Set([...selectedSet].filter((i) => i != id));
    } else {
      selected = selectedSet.add(id);
    }

    setSelectedSet(selected);
    props.onSessionSelectionChange(selected);
    updateState({});
  };

  const handleMainCheckboxChange = (event) => {
    let selected = new Set<number>([...selectedSet]);

    for (const session of shownSessions) {
      if (event.target.checked) {
        selected = selectedSet.add(session.id);
      } else {
        selected.delete(session.id);
      }
    }

    setSelectedSet(selected);
    props.onSessionSelectionChange(selected);
    updateState({});
  };

  const handleCloseConfirmation = () => {
    setConfirmationEndID(null);
  };

  return (
    <React.Fragment>
      <Dialog open={confirmationEndID != null}>
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to stop this game session?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ending a game session is permanent and this game session can no longer be used or viewed.
            A hidden copy will be kept kept in the database for logging and
            compilation of reports that used this game session.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => {
            props.onConfirmEnd(confirmationEndID);
            setConfirmationEndID(null);
          }}>
            End Permanently
          </Button>
          <Button onClick={handleCloseConfirmation} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h6" gutterBottom>
        Game Sessions
      </Typography>
      <Table data-testid="active-game-sessions">
        <TableHead>
          <TableRow>
            {props.selectable ?
              <TableCell>
                <Checkbox
                  id='main-checkbox'
                  onChange={handleMainCheckboxChange}
                  checked={shownSessions.every((s: GameSession) => selectedSet.has(s.id))}
                />
              </TableCell> :
              null
            }
            {props.qrCodes ? <TableCell>QR Code</TableCell> : null}
            <TableCell>ID</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Game Code</TableCell>
            {props.reportButtons ? <TableCell>View Reports</TableCell> : null}
            <TableCell>End Session</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shownSessions.map((row) => (
            <TableRow key={row.id}>
              {props.selectable ?
                <TableCell>
                  <Checkbox
                    id={`checkbox${row.id}`}
                    onChange={() => handleCheckboxChange(row.id)}
                    checked={selectedSet.has(row.id)}
                  />
                </TableCell> : null
              }
              {props.qrCodes ?
                <TableCell>
                  <Tooltip title="Download QR Code">
                    <IconButton size="large" onClick={() => props.onQRCodeButtonClicked(row.code)} data-testid={`qrcode-download-button-${row.id}`}>
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
                    id='report-button'
                    variant="outlined"
                    onClick={() => props.onReportButtonClicked(row.id)}
                  >
                    Reports
                  </Button>
                </TableCell> :
                null
              }
              <TableCell>
                <Tooltip title="End Game Session">
                  <IconButton
                    aria-label="end"
                    onClick={() => {
                      setConfirmationEndID(row.id);
                    }}
                  >
                    <Cancel />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={colSize} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow className="game-session-pagination">
            <TablePagination
              rowsPerPageOptions={[5, 15, 30, {label: 'All', value: -1}]}
              colSpan={colSize}
              count={gameSessions.length}
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
