import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Container';
import { ButtonGroup } from '@mui/material';
import { TextField } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import Alert from '@mui/material/Alert';
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
        <ButtonGroup variant="contained" size='large' alignItems="center" justify="center">
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