import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';

//Example game format as parsed JSON
// data: [
//     {
//       "id": '1',
//       'text': "This is the question itself",
//       "password": "psw",
//       "onlyChance": false,
//       "options": [
//           {
//           "text": "Option 1",
//           "link": "1a"
//             },
//             {
//                 "text": "Option 2",
//                 "link": "1b"
//             }
//         ],
//     }
// ]

export default function GameSession() {

  //a null gamecode will not allow page to load
  //Will have state.code, state.game, and state.formValues
  const { state } = useLocation();

  //Initialize to the first element of the array
  const [currentQuestion, setQuestion] = useState(state ? state.game[0] : null);
  //const [responses, setResponses] = useState([]);

  const nextQuestion = () => {
    //Set the selected option for play game user story
    //Collect response time data for same story
    //const nextQuestionLink = currentQuestion.options.link
    //Scan array (state.game) for the object where id === nextQuestionLink
    //Set it below
    setQuestion(null)
  }

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
            justify="center"
            alignItems="center"
          >
            <Container maxWidth="sm">
              <Typography>Game Code: {state ? state.code : "No Game Code"} </Typography>
            </Container>
            <Container maxWidth="sm">
              <Typography>Question: {currentQuestion ? currentQuestion.text : "Game not found"}</Typography>
              {/* Question options or chance game goes here */}
              <ButtonGroup variant="contained" justify="center">
                <Button color='secondary' onClick={nextQuestion} data-testid='continue' disabled={false}>Continue</Button>
              </ButtonGroup>
            </Container>
          </Box>
        </Container>
      </main>
    </div>
  );
}