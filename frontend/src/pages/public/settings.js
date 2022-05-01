import {Switch} from '@mui/material';
import React, {useState} from 'react';
import DefaultLayout from '../../components/layout/default.layout';

export default function Settings(props) {
  const [checked, setChecked] = useState(localStorage.getItem('dark') === 'true');

  const changeTheme = () => {
    setChecked(!checked);
    props.handleTheme();
  };

  return (
    <DefaultLayout>
      <Switch
        defaultChecked={checked}
        onChange={() => changeTheme()}
        inputProps={{'aria-label': 'controlled'}}
      />
    </DefaultLayout>
  );
}

