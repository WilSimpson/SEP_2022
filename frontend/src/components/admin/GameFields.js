import React from 'react';

export default function GameFields(props) {
    [name, setName] = React.useState(props.game.name)
    [active, setActive] = Reacet.useState(props.game.active)
    return (
        <Grid container justifyConter="center" component={Paper}>
            
        </Grid>
    );
};