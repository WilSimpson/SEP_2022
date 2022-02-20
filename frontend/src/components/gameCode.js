import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Container';
import { ButtonGroup } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';

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
        console.log(code);
         if (re.test(code)) {
            //Do the thing with auth service
            this.setState({errMsg: ""});
            if (true) {
                //Code is valid
            } else {
                //Code is invalid
            }
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
        const { classes } = this.props;
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
            InputProps={{className: classes.input}}
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

export default withStyles(styles)(GameCode);