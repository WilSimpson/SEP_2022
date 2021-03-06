import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Container';
import {ButtonGroup} from '@mui/material';
import {TextField} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import Alert from '@mui/material/Alert';
import {useNavigate} from 'react-router-dom';
import GamePlayService from '../../services/gameplay';
import {LinearProgress} from '@mui/material';

const styles = {
  input: {
    backgroundColor: '#FFFFFF',
  },
};

class GameCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.joinCode ? props.joinCode : '',
      errMsg: '',
      submitDisabled: props.joinCode ? (props.joinCode.length == 6 ? false : true) : true,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentDidMount() {
    if (this.props.joinCode && this.props.joinCode.length == 6) {
      this.submitCode();
    }
  }

  toggleLoading() {
    this.setState({loading: true});
  }

  handleChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({value: e.target.value});
      e.target.value.length === 6 ?
        this.setState({submitDisabled: false}) :
        this.setState({submitDisabled: true});
    }
  }

  submitCode() {
    this.toggleLoading();
    const re = /^[0-9\b]{6}$/;
    const code = this.state.value;
    if (re.test(code)) {
      // Do the thing with game service
      this.setState({errMsg: ''});
      GamePlayService.joinGame(code).then(
          (response) => {
            const path = `startingSurvey`;
            this.props.navigate(path, {
              state: {
              // Carries the gameCode with the state
                code: this.state.value,
                // Initialize state with the response
                // parsed as an array of questions
                game: response,
              },
            });
          },
          (error) => {
            if (error.response && error.response.status === 404) {
              this.setState({
                errMsg:
                'There was an unexpected error reaching the server. ' +
                'Please try again later.',
              });
            } else {
              if (error.response && error.response.status === 500) {
                this.setState({errMsg: error.response.data});
              } else {
                this.setState({
                  errMsg:
                  'The server is currently unreachable. ' +
                  'Please try again later.',
                });
              }
            }
          },
      ).catch((error) => this.setState({errMsg: 'unknown error'}));
    } else {
      // previous error message was unreachable
      this.setState({
        errMsg:
          'This Gamecode is not valid. ' +
          'Gamecodes must contain only number values.',
      });
    }
    this.toggleLoading();
  }

  render() {
    return (
      <Grid spacing={0} direction="column">
        <Box sx={{pb: 2}}>
          <Box sx={{pb: 2}}>
            {this.state.errMsg && (
              <Alert severity="error">{this.state.errMsg}</Alert>
            )}
          </Box>
          <TextField
            label="Game Code"
            id="gameCode"
            autoComplete="off"
            value={this.state.value}
            ref={this.props.gameCode}
            variant="outlined"
            inputProps={{
              'maxLength': 6,
              'data-testid': 'codeBox',
              'style': {textAlign: 'center'},
            }}
            onChange={this.handleChange}
          />
          <br />
        </Box>
        <Box sx={{pb: 2}}>
          {!this.state.errMsg && this.state.loading && <LinearProgress />}
        </Box>
        <ButtonGroup variant="contained" size="large" justify="center">
          <Button
            color="secondary"
            onClick={this.submitCode}
            data-testid="submit"
            disabled={this.state.submitDisabled}
          >
            Join Game
          </Button>
        </ButtonGroup>
      </Grid>
    );
  }
}

function WithNavigate(props) {
  const navigate = useNavigate();
  return <GameCode navigate={navigate} {...props} />;
}

export default withStyles(styles)(WithNavigate);
