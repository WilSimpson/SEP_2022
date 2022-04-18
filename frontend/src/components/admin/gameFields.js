import React from 'react';
import {Button, TextField, Grid, Switch} from '@mui/material';
import authService from '../../services/auth';
import {alertService} from '../../services/alert';

export default function GameFields(props) {
  const isEditing = props.game != null;

  const [title, setTitle] = React.useState(isEditing ? props.game.title : '');
  const [active, setActive] = React.useState(
    isEditing ? props.game.active : true,
  );
  const [code, setCode] = React.useState(isEditing ? props.game.code : null);
  const [questionsJSON, setQuestonsJSON] = React.useState(
    isEditing ? JSON.stringify(props.game.questions) : '[]',
  );
  const [optionsJSON, setOptionsJSON] = React.useState(
    isEditing ? JSON.stringify(props.game.options) : '[]',
  );
  const creatorID = isEditing ?
    props.game.creator_id :
    authService.currentUser().id;

  const editDisplay = isEditing ? {} : {display: 'none'};

  const handleFileUpload = (event) => {
    console.log('loaded file:', event.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);

        if (content['title'] == null) {
          alertService.error('No title');
          console.log('no title');
          return;
        }

        if (content['code'] == null) {
          alertService.error('No code');
          console.log('no code');
          return;
        }

        if (content['options'] == null) {
          alertService.error('No options');
          console.log('no options');
          return;
        }

        if (content['questions'] == null) {
          alertService.error('No questions');
          console.log('no questions');
          return;
        }

        setTitle(content['title']);
        setCode(content['code']);
        setQuestonsJSON(content['questsions']);
        setOptionsJSON(content['options']);
        console.log('uploaded!');
        console.log('title:', content['title']);
      } catch (error) {
        alertService.error('Error: File is not JSON format.');
        console.log('error:', error);
      }
    };
    reader.readAsText(event.target.files[0]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>{isEditing ? `Edit Game: ${props.game.title}` : 'Create Game'}</h2>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <TextField
          required
          id="outlined-required"
          label="Title"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{width: '100%'}}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3} sx={editDisplay}>
        {active ? 'Active' : 'Inactive'}{' '}
        <Switch
          label="Active"
          checked={active}
          onChange={() => setActive(!active)}
          sx={{width: '100%'}}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <TextField
          required
          id="outlined-required"
          label="Code"
          defaultValue={code}
          inputProps={{maxLength: 6}}
          onChange={(e) => setCode(e.target.value)}
          sx={{width: '100%'}}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          multiline
          required
          id="outlined-multiline-flexible"
          label="Questions JSON"
          defaultValue={questionsJSON}
          onChange={(e) => setQuestonsJSON(e.target.value)}
          sx={{width: '100%'}}
          rows={10}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          multiline
          required
          id="outlined-multiline-flexible"
          label="Options JSON"
          defaultValue={optionsJSON}
          onChange={(e) => setOptionsJSON(e.target.value)}
          sx={{width: '100%'}}
          rows={10}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant='contained'
          component='label'
          sx={{width: '100%'}}
        >
          Import from File
          <input
            type='file'
            onChange={handleFileUpload}
            hidden
          />
        </Button>
      </Grid>

      <Grid item xs={6}>
        <Button variant='outlined' onClick={props.onCancel} sx={{width: '100%'}}>Cancel</Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          onClick={() => {
            props.onSubmit(
                title,
                active,
                creatorID,
                code,
                questionsJSON,
                optionsJSON,
            );
          }}
          sx={{width: '100%'}}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
