import { Button, TextField, Grid, Switch } from '@mui/material';
import React from 'react';

export default function GameFields(props) {
    const isEditing = props.game != null

    const [title, setTitle] = React.useState(isEditing ? props.game.title : "")
    const [active, setActive] = React.useState(isEditing? props.game.active : true)
    const [questionsJSON, setQuestonsJSON] = React.useState(isEditing? JSON.stringify(props.game.questions) : "[]")
    const [optionsJSON, setOptionsJSON] = React.useState(isEditing? JSON.stringify(props.game.options) : "[]")
    
    const editDisplay = isEditing ? {} : { display: 'none' }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <h2>
                { 
                    isEditing
                        ? `Edit Game: ${props.game.title}` 
                        : "Create Game" 
                }
                </h2>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="outlined-required"
                    label="Title"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Grid>
            
            <Grid item xs={12} sx={editDisplay}>
                Active <Switch label="Active" checked={active} onChange={() => setActive(!active)} />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    multiline
                    required
                    id="outlined-multiline-flexible"
                    label="Questions JSON"
                    defaultValue={questionsJSON}
                    onChange={(e) => setQuestonsJSON(e.target.value)}
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
                    rows={10}
                />
            </Grid>

            <Grid item xs={6}>
                <Button onClick={props.onCancel}>Cancel</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" onClick={() => {props.onSubmit(title, active, questionsJSON, optionsJSON) }}>Submit</Button>
            </Grid>
        </Grid>
    );
};