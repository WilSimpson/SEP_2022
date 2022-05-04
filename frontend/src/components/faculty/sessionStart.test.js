import React from 'react';
import '../../setupTests';
import SessionStart from './sessionStart';
import {shallow, mount} from 'enzyme';
import {User} from '../../models/user';
import {Button, TextField} from '@mui/material';
import { act } from 'react-dom/test-utils';
import MockCourseService from '../../services/courses';
import MockGameService from '../../services/game';
import { BrowserRouter } from 'react-router-dom';
import { alertService } from '../../services/alert';

const user = new User(
    'email@example.com',
    'FirstName',
    'LastName',
    'ADMIN',
    'token',
    1,
);

jest.mock('../../services/game');
jest.mock('../../services/courses');


beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
  MockGameService.getGames.mockResolvedValue({data: []});
  MockCourseService.getMyCourses.mockResolvedValue({data: []});
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('<SessionStart />', () => {
  let comp = null;

  describe('starting a game session', () => {
    beforeEach(async () => {
      comp = shallow(<SessionStart />);
      await act(async () => {
          await Promise.resolve(comp);
          comp.update();
      });
    });

    it('Should have correct page title', () => {
      expect(comp.text()).toContain('Start Game Session');
    });

    it('should have an empty timeout field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Timeout (minutes)');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().value).toEqual('');
    });

    it('should have an empty additional notes field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Additional Notes');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().value).toEqual('');
    });

    it('should have a cancel button', () => {
      const found = false;
      const input = comp
          .find(Button)
          .filterWhere((i) => i.prop('children') == 'Cancel');
      expect(input.getElement()).not.toBeNull();
    });

    it('should have a submit button', () => {
      const found = false;
      const input = comp
          .find(Button)
          .filterWhere((i) => i.prop('children') == 'Submit');
      expect(input.getElement()).not.toBeNull();
    });
  });

  it('should call ths props onSubmit when submitted', () => {
    const myFunc = jest.fn();
    comp = shallow(<SessionStart onSubmit={myFunc} />);
    const input = comp
        .find(Button)
        .filterWhere((i) => i.prop('children') == 'Submit');
    expect(input.getElement()).not.toBeNull();
    act(() => {
      input.simulate('click');
    })
    expect(myFunc).toHaveBeenCalled();
  });

  it('should call ths props onCancel when submitted', () => {
    const myFunc = jest.fn();
    comp = shallow(<SessionStart onCancel={myFunc} />);
    const input = comp
        .find(Button)
        .filterWhere((i) => i.prop('children') == 'Cancel');
    expect(input.getElement()).not.toBeNull();
    act(() => {
      input.simulate('click');
    })
    expect(myFunc).toHaveBeenCalled();
  });
});
