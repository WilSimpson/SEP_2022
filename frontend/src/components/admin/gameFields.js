import React from 'react';
import {Button, TextField, Grid, Switch, InputLabel, Popover, Typography} from '@mui/material';
import authService from '../../services/auth';
import {alertService} from '../../services/alert';
import HelpIcon from '@mui/icons-material/Help';
import {CopyBlock, dracula, atomOneLight} from 'react-code-blocks';

export default function GameFields(props) {
  const isEditing = props.game != null;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title, setTitle] = React.useState(isEditing ? props.game.title : '');
  const [active, setActive] = React.useState(
    isEditing ? props.game.active : true,
  );

  const [code, setCode] = React.useState(isEditing ? props.game.code : '');
  const [questionsJSON, setQuestionsJSON] = React.useState(
    isEditing ? JSON.stringify(props.game.questions) : '[]',
  );

  const [optionsJSON, setOptionsJSON] = React.useState(
    isEditing ? JSON.stringify(props.game.options) : '[]',
  );

  const creatorID = isEditing ?
    props.game.creator_id :
    authService.currentUser().id;

  const editDisplay = isEditing ? {} : {display: 'none'};

  const handleFileUpload = async (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        if (content['title'] == null) {
          alertService.error('No title');
          return;
        }

        if (content['code'] == null) {
          alertService.error('No code');
          return;
        }

        if (content['options'] == null) {
          alertService.error('No options');
          return;
        }

        if (content['questions'] == null) {
          alertService.error('No questions');
          return;
        }

        setTitle(content['title']);
        setCode(content['code']);
        setQuestionsJSON(JSON.stringify(content['questions']));
        setOptionsJSON(JSON.stringify(content['options']));
      } catch (error) {
        alertService.error('Invalid file format');
      }
    };

    reader.readAsText(event.target.files[0]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gameFormatHelpOpen = Boolean(anchorEl);
  const id = gameFormatHelpOpen ? 'gameFormatHelp' : undefined;

  const gameFormat = (
    `{
      "title": "",
      "active": true,
      "creator_id": 1,
      "code": 123456,
      "questions": [
        {
          "label": "A",
          "value": "",
          "passcode": "123456",
          "chance": true,
          "chance_game": "SPIN_WHEEL",
          "location": "SC122"
        }
      ],
      "options": [
        {
          "value": "",
          "source_label": "A",
          "dest_label": "1A",
          "weight": 1
        }
      ]
    }`);

  const gameFormatHelp = (
    <Popover
      id={id}
      open={gameFormatHelpOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Typography sx={{p: 2}}>
        {isEditing ?
        <div>
          When editing a game, questions and options cannot be added or removed. <br/>
          You may only change fields of existing questions and options.
        </div> :
        (<div>
          A game is created in JSON format.<br/>
          The following is the way an imported file should be formatted:<br/>
          <CopyBlock
            text={gameFormat}
            language={'JSON'}
            showLineNumbers={true}
            theme={localStorage.getItem('dark') === 'false' ? atomOneLight : dracula}
            codeBlock
          />
        </div>)
        }
      </Typography>
    </Popover>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>
          {isEditing ? `Edit Game: ${props.game.title}` : 'Create Game'}
          <Button id="help" aria-describedby={id} onClick={handleClick}>
            <HelpIcon />
          </Button>
          {gameFormatHelp}
        </h2>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <TextField
          required
          id="outlined-required"
          label="Title"
          value={title}
          data-testid='title'
          onChange={(e) => setTitle(e.target.value)}
          sx={{width: '100%'}}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3} sx={editDisplay}>
        <InputLabel>{active ? 'Active' : 'Inactive'}</InputLabel>
        <Switch
          label="Active"
          checked={active}
          data-testid='active'
          onChange={() => setActive(!active)}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <TextField
          required
          id="outlined-required"
          label="Code"
          value={code}
          data-testid='code'
          inputProps={{maxLength: 6}}
          onChange={(e) => setCode(e.target.value)}
          sx={{width: '100%'}}
        />
      </Grid>

      {isEditing ? null :
        <Grid item xs={12} md={6} lg={3} container direction="row" alignItems="center" justifySelf="flex-end">
          <Button
            variant='contained'
            component='label'
            sx={{
              width: '100%',
            }}
          >
            Import from File
            <input
              data-testid='file-upload'
              type='file'
              onChange={handleFileUpload}
              hidden
            />
          </Button>
        </Grid>
      }
      <Grid item xs={12}>
        <TextField
          multiline
          required
          id="outlined-multiline-flexible"
          label="Questions JSON"
          data-testid='questionJSON'
          value={questionsJSON}
          onChange={(e) => setQuestionsJSON(e.target.value)}
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
          data-testid='optionsJSON'
          value={optionsJSON}
          onChange={(e) => setOptionsJSON(e.target.value)}
          sx={{width: '100%'}}
          rows={10}
        />
      </Grid>
      <Grid item xs={6}>
        <Button variant='outlined' onClick={props.onCancel} sx={{width: '100%'}}>Cancel</Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="secondary"
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
