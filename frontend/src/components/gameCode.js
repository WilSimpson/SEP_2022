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
            <Button color='primary' href={this.state.value} onClick={() => console.log(this.state.value)}>Join Game</Button>
            </ButtonGroup>
        </Container>
        );
    }
}

export default withStyles(styles)(GameCode);