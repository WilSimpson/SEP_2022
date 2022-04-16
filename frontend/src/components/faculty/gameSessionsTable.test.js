import React from 'react';
import '../../setupTests';
import GameSessionsTable from './gameSessionsTable';
import {mount} from 'enzyme';
import {User} from '../../models/user';
import {act} from 'react-dom/test-utils';
import {BrowserRouter} from 'react-router-dom';

const user = new User(
    'email@example.com',
    'FirstName',
    'LastName',
    'ADMIN',
    'token',
    1,
);

const sessions = [
  {
    'code': 251772,
    'created_at': "2022-03-30T07:41:32.910199Z",
    'creator_id': 2,
    'end_time': null,
    'game': 7,
    'id': 3,
    'notes': "New notes",
    'start_time': "2022-03-30T07:41:32.908204Z",
    'timeout': 30,
    'updated_at': "2022-03-30T07:41:32.910",
    'courseID': 1,
    'isGuest': false,
  }
]

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
});

afterEach(() => {
  localStorage.clear();
});

describe('<GameSessionsTable />', () => {
  it('should render', () => {
    let wrapper;
    act(() => {
      wrapper = mount(<BrowserRouter><GameSessionsTable /></BrowserRouter>);
    });
    expect(wrapper);
    expect(wrapper.text()).toContain('Game Sessions');
  });

  it('should handle qr code button correctly', async () => {
    let wrapper;
    const handleCallback = jest.fn();
    await act(async () => {
      wrapper = mount(<BrowserRouter><GameSessionsTable qrCodes onQRCodeButtonClicked={handleCallback} gameSessions={sessions}/></BrowserRouter>);
      wrapper.find({'data-testid': `qrcode-download-button-${sessions[0].id}`}).hostNodes().simulate('click');
    });

    expect(handleCallback).toHaveBeenCalled();
  })
});
