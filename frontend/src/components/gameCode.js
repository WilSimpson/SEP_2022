import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { ButtonGroup } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

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
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({value: e.target.value})
         }
     }

    submitCode(code) {
        const re = /^[0-9\b]{6}$/;
         if (re.test(code)) {
            //Do the thing with auth service
            console.log(`Hello, ${code}`);
         } else {
            //There is a problem; display an error message
            console.log("There do be a problem");
         }
     }

    render () {
        const { classes } = this.props;
        return (
        <Container>
        <Box sx={{pb:2}}>
            <TextField 
            label="Game Code"
            id="gameCode"
            value={this.state.value}
            ref="gameCode"
            variant="outlined"
            inputProps={{ maxLength: 6}}
            InputProps={{className: classes.input}}
            onChange={this.handleChange} /><br />
            </Box>
            <ButtonGroup variant="contained" size='large'>
            <Button color='primary' onClick={() => this.submitCode(this.state.value)}>Join Game</Button>
            </ButtonGroup>
        </Container>
        );
    }
}

export default withStyles(styles)(GameCode);