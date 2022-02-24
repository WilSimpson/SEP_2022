import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

export default function StartingSurvey() {

  const defaultValues = {
    name: "",
    size: 1,
    first: "",
    type: "",
  };

    //a null gamecode will not allow page to load
    const { state } = useLocation();

    const [formValues, setFormValues] = useState(defaultValues);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
      let disableSubmit = false;
      Object.entries(formValues).map(([key, value]) => {
        if (value === defaultValues[key] && key !== 'size') {
          disableSubmit = true;
        }
      setSubmitDisabled(disableSubmit);
      return true;
    })
    };

    let navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formValues);
      let path = `../gameSession`; 
      navigate(path, {
          state: {
              //Carries the gameCode with the state
              code: state ? state.code : 'DEV###',
              //Initialize state with the response parsed as an array of questions
              game: state ? state.game : [
                    {
                      "id": '1',
                      'text': "This is an example question for development",
                      "password": "psw",
                      "onlyChance": false,
                      "options": [
                          {
                          "text": "Option 1",
                          "link": "1a"
                            },
                            {
                                "text": "Option 2",
                                "link": "1b"
                            }
                        ],
                    }
                ],
              //Carry the form data forward
              formData: formValues,
          }
      });
    };

  return (
      <div className='container'>
      <CssBaseline />
      <main>
        {/* Hero unit */}
    <Container maxWidth='xl'>
        <Box
          sx={{
            pt: 0,
            pb: 6,
            borderRadius: 4,
            mt: 3,
            mb: 3,
          }}
        >
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
        <Box sx={{pb:2}}>
          <TextField
            id="team-size"
            name="size"
            label="size"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            value={formValues.size}
            onChange={handleInputChange}
            data-testid='size'
            required
          />
          </Box>
        </Grid>
        <Grid item>
        <Box sx={{pb:2}}>
          <FormControl>
            <FormLabel>Is this your first time playing this game?</FormLabel>
            <RadioGroup
              name="first"
              value={formValues.first}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="yes"
                value="yes"
                control={<Radio size="small" />}
                label="Yes"
                selected
              />
              <FormControlLabel
                key="no"
                value="no"
                control={<Radio size="small" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          </Box>
        </Grid>
        <Grid item>
        <Box sx={{pb:2}}>
          <FormControl>
          <FormLabel>Which version of the game would you like to play?</FormLabel>
            <Select
              name="type"
              value={formValues.type}
              onChange={handleInputChange}
              required
            >
              <MenuItem key="walk" value="walk">
                Walking
              </MenuItem>
              <MenuItem key="limited" value="limited">
                Limited Walking
              </MenuItem>
              <MenuItem key="none" value="none">
                No Walking
              </MenuItem>
            </Select>
          </FormControl>
          </Box>
        </Grid>
        <Grid item>
        <Box sx={{pb:2}}>
          <TextField
            id="team-name"
            name="name"
            label="Team Name"
            type="text"
            autoComplete='off'
            value={formValues.name}
            onChange={handleInputChange}
            data-testid='name'
            inputProps={{ "data-testid": "name" }}
            required
          />
          </Box>
        </Grid>
        <Button variant="contained" color="primary" type="submit" data-testid='submit' disabled={submitDisabled}>
          Submit
        </Button>
      </Grid>
    </form>
        </Box>
    </Container>
      </main>
      </div>
  );
}