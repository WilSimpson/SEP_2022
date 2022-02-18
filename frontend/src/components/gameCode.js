import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { ButtonGroup } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';

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
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitCode = this.submitCode.bind(this);
    }

    handleChange(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({value: e.target.value})
         }
     }

    submitCode() {
        const re = /^[0-9\b]{6}$/;
        const code = this.state.value;
        console.log(code);
         if (re.test(code)) {
            //Do the thing with auth service
            this.setState({errMsg: ""});
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
        <Container>
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
            inputProps={{ maxLength: 6}}
            InputProps={{className: classes.input}}
            onChange={this.handleChange}
            data-testid="codeBox" /><br />
            </Box>
            <ButtonGroup variant="contained" size='large'>
            <Button color='primary' onClick={this.submitCode} data-testid="submitButton">Join Game</Button>
            </ButtonGroup>
        </Container>
        );
    }
}

export default withStyles(styles)(GameCode);