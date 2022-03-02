import { Button, TextField, Grid, Switch } from '@mui/material';
import React from 'react';

export default function GameFields(props) {
    const isEditing = props.game != null

    const [name, setName] = React.useState(isEditing ? props.game.name : "")
    const [active, setActive] = React.useState(isEditing? props.game.active : true)
    const [json, setJSON] = React.useState(isEditing? props.game.json : "")
    
    const editDisplay = isEditing ? {} : { display: 'none' }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <h2>
                { 
                    isEditing
                        ? `Edit Game ${props.game.id} (${props.game.name})` 
                        : "Create Game" 
                }
                </h2>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Grid>
            
            <Grid item xs={12} sx={editDisplay}>
                Active <Switch label="Active" checked={active} />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    multiline
                    required
                    id="outlined-multiline-flexible"
                    label="Game JSON"
                    defaultValue={json}
                    onChange={(e) => setJSON(e.target.value)}
                    rows={10}
                />
            </Grid>

            <Grid item xs={6}>
                <Button onClick={props.onCancel}>Cancel</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" onClick={() => {props.onSubmit(name, active, json) }}>Submit</Button>
            </Grid>
        </Grid>
    );
};