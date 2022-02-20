import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Container';
import { ButtonGroup } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useNavigate } from "react-router-dom";
import AuthService from '../services/services';

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
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitCode = this.submitCode.bind(this);
    }

    handleChange(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({value: e.target.value});
            e.target.value.length === 6 ? this.setState({submitDisabled: false}) : this.setState({submitDisabled: true})
         }
     }

    submitCode() {
        const re = /^[0-9\b]{6}$/;
        const code = this.state.value;
         if (re.test(code)) {
            //Do the thing with auth service
            this.setState({errMsg: ""});
            AuthService.joinGame(code).then(
                (response) => {
                    if (response.status === 200) {
                        let path = `gameSession`; 
                        this.props.navigate(path, {
                            state: {
                                code: this.state.value,
                            }
                        });
                    }
                },
                (error) => {
                    if (error.response.status === 401) {
                        this.setState({errMsg: error.response.data.detail});
                    } else if (error.response.status === 404) {
                        this.setState({errMsg: "Could not communicate with the server. Please try again later or contact the game owner."});
                    } else {
                        this.setState({errMsg: error.response.data.detail});
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
     }

    render () {
        return (
        <Grid container alignItems="center" justifyContent="center">
        <CssBaseline />
        <Box sx={{pb:2}}   alignItems="center" justifyContent="center">
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
            inputProps={{ maxLength: 6, 'data-testid': 'codeBox'}}
            onChange={this.handleChange}
             /><br />
            </Box>
            <ButtonGroup variant="contained" size='large'>
            <Button color='primary' onClick={this.submitCode} inputProps={{ 'data-testid': 'submit'}} data-testid='submit' disabled={this.state.submitDisabled}>Join Game</Button>
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