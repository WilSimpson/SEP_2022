import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Container';
import { ButtonGroup } from '@mui/material';
import { TextField } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import GameService from '../services/services';
import { LinearProgress } from '@mui/material';

const styles = {
    input: {
      backgroundColor: "#FFFFFF"
    }
  };

  class GameCode extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            errMsg: '',
            submitDisabled: true,
            loading: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
    }

    toggleLoading() {
        this.setState({loading: true});
    }

    handleChange(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({value: e.target.value});
            e.target.value.length === 6 ? this.setState({submitDisabled: false}) : this.setState({submitDisabled: true})
         }
     }

    submitCode() {
        this.toggleLoading()
        const re = /^[0-9\b]{6}$/;
        const code = this.state.value;
         if (re.test(code)) {
            //Do the thing with game service
            this.setState({errMsg: ""});
            GameService.joinGame(code).then(
                (response) => {
                    console.log(response)
                    let path = `startingSurvey`; 
                    this.props.navigate(path, {
                        state: {
                            //Carries the gameCode with the state
                            code: this.state.value,
                            //Initialize state with the response parsed as an array of questions
                            game: response,
                        }
                    });

                },
                (error) => {
                    console.log(error.response.status);
                    if (error.resonse && error.response.status === 404) {
                        this.setState({errMsg: "Could not communicate with the server. Please try again later or contact the game owner."});
                    } else {
                        if (error.response.status === 501) {
                            this.setState({errMsg: "This game does not exist"});
                        }
                        else if (error.response.status === 502) {
                            this.setState({errMsg: "This game is not currently active"});
                        } else if (error.response.status === 503) {
                            this.setState({errMsg: "There is no game session associated with this game"});
                        } else {
                            this.setState({errMsg: "There was a problem. Please try again later."});
                        }
                    }
                }
            );
         } else {
            //There is a problem; display an error message
            if (code.length < 6) {
                this.setState({errMsg: "This Gamecode is not valid. Gamecodes must be six digits long."});
            } else {
                this.setState({errMsg: "This Gamecode is not valid. Gamecodes must contain only number values."});
            }
         }
         this.toggleLoading()
     }

    render () {
        return (
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            >
        <Box sx={{pb:2}}>
            <Box sx={{pb:2}}>
                { this.state.errMsg && <Alert severity="error">{this.state.errMsg}</Alert> }
            </Box>
            <TextField 
            label="Game Code"
            id="gameCode"
            autoComplete='off'
            value={this.state.value}
            ref="gameCode"
            variant="outlined"
            inputProps={{ maxLength: 6, 'data-testid': 'codeBox', style: { textAlign: 'center' }}}
            onChange={this.handleChange}/>
            <br />
        </Box>
        <Box sx={{pb:2}}>
                { !this.state.errMsg && this.state.loading && <LinearProgress /> }
        </Box>
        <ButtonGroup variant="contained" size='large' alignItems="center" justify="center">
            <Button color='secondary' onClick={this.submitCode} inputProps={{ 'data-testid': 'submit'}} data-testid='submit' disabled={this.state.submitDisabled}>Join Game</Button>
        </ButtonGroup>
        </Grid>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <GameCode navigate={navigate} />
}

export default withStyles(styles)(WithNavigate);