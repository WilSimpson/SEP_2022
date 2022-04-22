import React from 'react';
import '../../setupTests';
import GameFields from './gameFields';
import {shallow} from 'enzyme';
import {User} from '../../models/user';
import {Button, TextField} from '@mui/material';

const user = new User(
    'email@example.com',
    'FirstName',
    'LastName',
    'ADMIN',
    'token',
    1,
);

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

describe('<GameFields />', () => {
  let comp = null;

  describe('creating a game', () => {
    beforeEach(() => {
      comp = shallow(<GameFields />);
    });

    it('Should have correct page title', () => {
      expect(comp.text()).toContain('Create Game');
    });

    it('should have an empty target title field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Title');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().defaultValue).toEqual('');
    });

    it('should have an empty code field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Code');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().defaultValue).toEqual(null);
    });

    it('should have an empty questions field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Questions JSON');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().defaultValue).toEqual('[]');
    });

    it('should have an empty options field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Options JSON');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().defaultValue).toEqual('[]');
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

  describe('edting a game', () => {
    const game = {
      title: 'My Title',
      active: false,
      questions: [{id: 1}],
      options: [{id: 2}],
      code: 123412,
    };

    beforeEach(() => {
      comp = shallow(<GameFields game={game} />);
    });

    it('Should have correct page title', () => {
      expect(comp.text()).toContain('Edit Game');
      expect(comp.text()).toContain(game.title);
    });

    it('should have an empty target title field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Title');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().defaultValue).toEqual(game.title);
    });

    it('should have an empty code field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Code');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().defaultValue).toEqual(game.code);
    });

    it('should have an empty questions field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Questions JSON');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().defaultValue).toEqual(
          JSON.stringify(game.questions),
      );
    });

    it('should have an empty options field', () => {
      const input = comp
          .find(TextField)
          .filterWhere((i) => i.props().label == 'Options JSON');
      expect(input.getElement()).not.toBeNull();
      expect(input.props().defaultValue).toEqual(JSON.stringify(game.options));
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
    comp = shallow(<GameFields onSubmit={myFunc} />);
    const input = comp
        .find(Button)
        .filterWhere((i) => i.prop('children') == 'Submit');
    expect(input.getElement()).not.toBeNull();
    input.simulate('click');
    expect(myFunc).toHaveBeenCalled();
  });

  it('should call ths props onCancel when submitted', () => {
    const myFunc = jest.fn();
    comp = shallow(<GameFields onCancel={myFunc} />);
    const input = comp
        .find(Button)
        .filterWhere((i) => i.prop('children') == 'Cancel');
    expect(input.getElement()).not.toBeNull();
    input.simulate('click');
    expect(myFunc).toHaveBeenCalled();
  });
});
