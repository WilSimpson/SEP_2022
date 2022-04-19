import React from 'react';
import '../../setupTests';
import {shallow} from 'enzyme';
import {CircularProgress} from '@mui/material';
import Loading from './loading';
import AdminDash from '../../pages/admin/dashboard';

describe('<Loading />', () => {
  it ('should display Circular Progress when loading true', () => {
    const wrapper = shallow(<Loading loading={true} />);
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
  });
  it ('should display child component when loading false', () => {
    const wrapper = shallow(
      <Loading loading={false}>
        <AdminDash />
      </Loading>
    );
    expect(wrapper.find(AdminDash)).toHaveLength(1);
  });
});