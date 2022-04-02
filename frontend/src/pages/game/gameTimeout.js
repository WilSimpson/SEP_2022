import React, {useState} from 'react';
// import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import GamePlayTimeout from '../../components/game/gamePlayTimeout';

export default function EndGame() {
  // const navigate = useNavigate();
  const [timeoutOpen, setTimeoutOpen] = useState(false);

  const handleTimeoutOpen = () => {
    // navigate('/');
    setTimeoutOpen(true);
  };

  const handleTimeoutClose = () => {
    setTimeoutOpen(false);
  };

  // function newGame() {

  // }

  return (
    <div>
      <Button variant='outlined' onClick={handleTimeoutOpen}>
        Open timeout dialog
      </Button>
      <GamePlayTimeout open={timeoutOpen} onclose={handleTimeoutClose}/>
    </div>
  );
}
